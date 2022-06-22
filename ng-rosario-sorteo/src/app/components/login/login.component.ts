import { Component, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public login() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
    .then(userCredential =>
      {
        if (userCredential) {
          this.router.navigate(['participant']);
        }
      }
      );
  }

}
