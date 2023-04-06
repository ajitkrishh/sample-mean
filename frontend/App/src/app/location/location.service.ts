import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Location {
  id:string,
  cityId:number,
  pincode:number,
}

export interface updateLocation {
  city:number,
  pincode:number,
}

export interface country {
  name:string,
  _id:number,
}

export interface state {
  name:string,
  _id:number,
  countryId:number,
}
export interface city {
  name:string,
  _id:number,
  stateId:number,
}

export interface FormBody {
  "cityId": number,
  "_id": number,
  "address": string,
  "pincode": string,
  "city": string,
  "state": string,
  "country": string,
  "stateId": number,
  "countryId": number
}


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  rootUrl = "http://localhost:3000/v1/location";
  cityUrl = "http://localhost:3000/v1/city";
  stateUrl = "http://localhost:3000/v1/state";
  countryUrl = "http://localhost:3000/v1/country";

  constructor(private http:HttpClient) {  }

  get(){
    let locations =  this.http.get<any>(this.rootUrl)
    // locations.subscribe(res=>{console.log(res)});
    
    return this.http.get<any>(this.rootUrl)
  }
  getLocationById(id:number){
    return this.http.get<any>(`${this.rootUrl}/${id}` )
  }

  update(id:string, payload:updateLocation){
    return this.http.patch<Location>(`${this.rootUrl}/${id}` , payload)
  }
  create(payload : updateLocation){
    return this.http.post<Location>(`${this.rootUrl}` , payload)
  }
  delete(id:string){
    let result = this.http.delete<any>(`${this.rootUrl}/${id}`) 
    return result
  }
  getState(){
    return this.http.get<any>(this.stateUrl)
  }
  getStateByCountryId(id:number){
    return this.http.get<any>(this.stateUrl+'?countryId='+id)
  }
  getCityByStateId(id:number){
    return this.http.get<any>(this.cityUrl+'?stateId='+id)
  }
  getStateById(id:any){
    console.log("my id is " , id);
    
    return this.http.get<any>(`${this.stateUrl}/${id}` )
  }
  getCity(){
    return this.http.get<any>(this.cityUrl)
  }
  getCityById(id:number){
    return this.http.get<any>(`${this.cityUrl}/${id}` )
  }
  getCountry(){
    return this.http.get<any>(this.countryUrl)
  }
  getCountryById(id:number){
    return this.http.get<any>(`${this.countryUrl}/${id}` )
  }
}
