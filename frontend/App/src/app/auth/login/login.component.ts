import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginValid = false;


  public myLoginForm: FormGroup = new FormGroup({});
  errormsg = null;
  private isloggedin = false;
  constructor(
    private _router: Router, private userservice: UserService
  ) { }

  public ngOnInit(): void {
    let s = localStorage.getItem('currentuser');
    let user = s!== null? JSON.parse(s):"" ;
    if (!!user){
      this._router.navigate(['./location']);
    }
   
    this.myLoginForm = new FormGroup({
      email: new FormControl( "ajitkrishh@gmail.com", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      password: new FormControl('password1', [Validators.required, Validators.minLength(6)])
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.myLoginForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    let user = { ... this.myLoginForm.value }
    this.userservice.login(user).subscribe((response) =>{
        localStorage.setItem('currentuser' , JSON.stringify({accessToken: response.tokens.access.token , refreshToken: response.tokens.refresh.token,status:1}))
        this._router.navigate(["./location"])
      },(error)=>{
        if(error.status === 0){
          alert("Backend Not Configured !!! ")
        }
        this.loginValid = false; console.log(error);
        this.errormsg = error.error.message;   
      }
    )
   
  
  }
}
