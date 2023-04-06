import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface user {
  _id: number,
  name: string,
  email: string,
  role: string,
}
interface logindata{
  email: string,
  password:string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  login(formdata : logindata){
    return this.http.post<any>("http://localhost:3000/v1/auth/login" , formdata);
  }
  get(){
    return this.http.get<any>("http://localhost:3000/v1/")
  }
  create(userdata:any){
    return this.http.post<any>("http://localhost:3000/v1/",userdata)
  }

}
