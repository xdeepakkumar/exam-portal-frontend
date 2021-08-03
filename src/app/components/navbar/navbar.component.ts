import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

  constructor(public _loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoggedIn = this._loginService.isLoggedIn();
    this.user = this._loginService.getUser();
    // loading the data of navbar
    this._loginService.loginStatusSubject.asObservable().subscribe(
      (data)=>{
        this.isLoggedIn = this._loginService.isLoggedIn();
        this.user = this._loginService.getUser();
      }
    );
  }

  public logout(){
    this._loginService.logout();
    this.isLoggedIn = false;
    this.user = null;
    window.location.reload();
  }

}
