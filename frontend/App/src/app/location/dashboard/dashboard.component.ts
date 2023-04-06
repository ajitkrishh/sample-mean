import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LocationService, Location, FormBody } from '../location.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: String[] = ['id', 'address', 'city', 'state', 'country', 'pincode', 'edit', 'delete']

  dataSource = new MatTableDataSource<any>([])
  formdailog: MatDialogRef<DialogComponent> | null = null;
  user = "user"
  srch = ""
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private locationservice: LocationService, private _router: Router, private dialogModel: MatDialog) { }

  ngOnInit(): void {
    let s = localStorage.getItem('currentuser');
    let user = s !== null ? JSON.parse(s) : "";
    if (!user) {
      this._router.navigate(['auth/login']);
    }
  }

  // --------------------------------------------------------------------

  async getloc() {
    this.locationservice.get().subscribe((res) => {
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngAfterViewInit(): void {
    this.getloc();
  }


  logout(): void {
    localStorage.removeItem("currentuser");
    this._router.navigate(['auth/login'])

  }
  searchLocation() {

    let searchStr: string = this.srch;
    if (searchStr.length >= 3) {
      this.dataSource.filter = searchStr.trim().toLocaleLowerCase();
    } else {
      this.dataSource.filter = "";
    }
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    const formdialog = this.dialogModel.open(DialogComponent, { data: {} as FormBody, disableClose: true });
    formdialog.afterClosed().subscribe(result => {
      if (!!result) {
        result = result.data
        delete result.id;
        delete result.countryId
        delete result.stateId
        this.locationservice.create(result).subscribe(async (res) => {
          this.getloc();
        }, (err) => {
          alert(err.error.message)
          console.log(err);

        })
      }
    })
  }
  edit(id: string) {
    let DialogData = this.dataSource.data.filter(_ => _._id == id)[0]
    const formdialog = this.dialogModel.open(DialogComponent, { data: { ...DialogData }, height: '370px' });

    formdialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.locationservice.update(id, result.data).subscribe(async (res) => {
          this.locationservice.getLocationById(parseInt(id)).subscribe((res) => {
            const foundIndex = this.dataSource.data.findIndex(x => x._id === id);
            res._id = res.id
            res.city._id = res.city.id
            res.state._id = res.state.id
            res.country._id = res.country.id
            delete res.city.id
            delete res.state.id
            delete res.country.id
            this.dataSource.data[foundIndex] = res;

            this.dataSource.data = this.dataSource.data;
          })
        }, (err) => {
          console.log(err);

        })
      }
    })
  }
  delete(id: string) {
    if (window.confirm("Are you Sure , You want to delete item id: " + id + " ?")) {
      this.locationservice.delete(id).subscribe((res) => {
        const foundIndex = this.dataSource.data.findIndex(x => x.id === id);
        this.dataSource.data.splice(foundIndex, 1);
        this.dataSource.data = this.dataSource.data;
      }, (err) => {
        console.log(err);
      })
    }
  }
}
