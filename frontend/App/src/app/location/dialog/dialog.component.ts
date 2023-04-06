import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService, FormBody, city, state, country } from '../location.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  Country = new FormControl<string | country>('', [Validators.required, Validators.minLength(3), this.selectionValidator]);
  State = new FormControl<string | state>('', [Validators.required, Validators.minLength(3), this.selectionValidator]);
  City = new FormControl<string | city>('', [Validators.required, Validators.minLength(3), this.selectionValidator]);
  Pincode = new FormControl<string>('', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]);
  Address = new FormControl<string>('', [Validators.required, this.minimumLengthValidator]);

  formdata: any;
  pin = true;
  countries: country[] = []
  states: state[] = []
  cities: city[] = []
  filteredCountries !: Observable<country[]>;
  filteredStates !: Observable<country[]>;
  filteredCities !: Observable<country[]>;
  partialData: any = {}

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: FormBody, private locationservice: LocationService,) {
    this.formdata = data;

    console.log("received", this.formdata);

  }
  ngOnInit(): void {
    this.locationservice.getCountry().subscribe((res) => {
      this.countries = res.results;
      this.loadCountries();
    })
    let isNewEntry = !this.formdata._id;
    if (isNewEntry) {
      console.log("new entry");
    } else {
      console.log("update", this.formdata);

      this.State.setValue({ _id: this.formdata.stateId, name: this.formdata.state.name, countryId: this.formdata.countryId })
      this.City.setValue({ _id: this.formdata.cityId, name: this.formdata.city.name, stateId: this.formdata.stateId })
      this.Address.setValue(this.formdata.address)
      this.Pincode.setValue(this.formdata.pincode)
      this.Country.setValue({ _id: this.formdata.countryId, name: this.formdata.country.name })

      this.locationservice.getStateByCountryId(this.formdata.countryId).subscribe(res => {
        this.states = res.results;
      })
      this.locationservice.getCityByStateId(this.formdata.stateId).subscribe(res => {
        this.cities = res.results;
      })
    }
  }

  loadCountries() {
    this.filteredCountries = this.Country.valueChanges.pipe(startWith(''), map(
      value => {
        const name = typeof value === 'string' ? value : value?.name;
        if (name !== undefined && name.length > 2) {
          let filtercountrylist = this.country_filter(name as string) 
          return name ? filtercountrylist : this.countries.slice();
        } else {
          return []
        }
      }));
  }


  loadState() {
    this.filteredStates = this.State.valueChanges.pipe(startWith(''), map(
      value => {
        const name = typeof value === 'string' ? value : value?.name;
        if (name !== undefined && name.length > 2) {
          return name ? this.state_filter(name as string) : this.states.slice();
        } else {
          return []
        }
      }),
    );
  }
  loadCity() {
    this.filteredCities = this.City.valueChanges.pipe(startWith(''), map(
      value => {
        const name = typeof value === 'string' ? value : value?.name;
        if (name !== undefined && name.length > 2) {
          return name ? this.city_filter(name as string) : this.cities.slice();
        } else {
          return []
        }
      }),
    );
  }
  displayCountry(data: any) {
    if (!!data) {
      if(data.id != this.formdata.countryId){
        console.log(data.id , this.formdata.countryId);        
        this.formdata.countryId = data.id;
        this.locationservice.getStateByCountryId(data.id).toPromise().then(res => {
        this.states = res.results;
      })
      }
    }
    console.log("no country data" , data);
    console.log(data && data.name ? data.name : '');
    
    return data && data.name ? data.name : '';

  }
  displayState(data: any) {
    if (!!data.id) {
      console.log(data);
      
      this.formdata.stateId = data.id;
      console.log("state updates , ", this.State.value);
      this.locationservice.getCityByStateId(data.id).subscribe((res) => {
        this.cities = res.results;
      });
    }
    return data && data.name ? data.name : '';
  }
  displayCity(data: any) {
    if (!!data.id) {
      console.log("city updates , ", this.City.value);
      this.formdata.cityId = data.id;
    }
    return data && data.name ? data.name : '';
  }
  CountryChange() {
    this.State.setValue({} as state)
    this.City.setValue({} as city)
  }
  StateChange() {
    console.log("city Changed");
    this.City.setValue({} as city)
  }
  CityChange() {
  }
  private country_filter(name: string): country[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private state_filter(name: string): state[] {
    const filterValue = name.toLowerCase();
    return this.states.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private city_filter(name: string): city[] {
    const filterValue = name.toLowerCase();
    return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirm() {
    if (this.Address.value !== null && this.Pincode.value !== null) {
      let form:any = { "address":this.Address.value , "pincode":this.Pincode.value.toString() , "cityId":this.formdata.cityId }
      // this.formdata.address = this.Address.value
      // this.formdata.pincode = this.Pincode.value.toString()
      // let formm = this.formdata
      console.log("final form ",form);
      if (!!form.cityId) {
        this.dialogRef.close({ data: form });
      }
    }
  }

  public minimumLengthValidator(control: FormControl) {
    let s = control.value || ''
    if (s.length > 0) {
      let length = s.trim().length
      if (0 < length && length < 5) {
        return { 'minlength': true };
      }
    }
    return null
  }
  public selectionValidator(control: FormControl) {
    let s = control.value
    if (typeof s === 'string') {
      if(s.length >2){ return {'selection':true} }
    }
    return null
  }
}
