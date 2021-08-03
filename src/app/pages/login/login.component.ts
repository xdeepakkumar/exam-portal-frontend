import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = {
    username: '',
    password: ''
  }

  constructor(private snackBar: MatSnackBar, private _loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.password.trim() == '' || this.loginData.username == null || this.loginData.password == null){
      this.snackBar.open("All fields are required", "OK");
      return;
    }
    //token generation
    this._loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        // do login
        this._loginService.loginUser(data.token);
        this._loginService.getCurrentUser().subscribe(
          (user:any) => {
            this._loginService.setUser(user);
            console.log(user);
            //redirect ADMIN : admin-dashboard
            if(this._loginService.getUserRole() == 'ADMIN'){
              //admin dashboard
              this.router.navigate(["/admin-dashboard"])
              this._loginService.loginStatusSubject.next(true);

            }else if(this._loginService.getUserRole() == 'NORMAL'){

              //user dashboard
              this.router.navigate(["user-dashboard/0"]);
              this._loginService.loginStatusSubject.next(true);
            }else{
              this._loginService.logout();
              location.reload();
            }
            //redirect NORMAL : user-dashboard
          }
        );
      },
      (error)=>{
        this.snackBar.open("Invalid username or password ! Try again.", "ok");
      }
    );

  }

}
