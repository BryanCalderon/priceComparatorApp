import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { default as firebase } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _success = new Subject<string>();
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        })
      }
    });

    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = '');
  }

  loginWithToken() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this._success.next(`Usuario o contraseña no valido`);
    })
  }

  /* ***************** FIREBASE ***************** */
  loginWithEmail() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.router.navigate(['/home']);
    }).catch(response => {
      this._success.next(response.message);
    });
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  /* ***************** FIREBASE ***************** */
}
