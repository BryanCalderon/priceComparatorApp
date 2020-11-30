import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { default as firebase } from 'firebase/app';
import { User, UserService } from 'src/app/services/user/user.service';

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
    private ngZone: NgZone,
    private userService: UserService,
    private authService: AuthService
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

  login() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(user => {
      this.userService.getByUID(user.user.uid).subscribe(client => this.auth.saveUserIntoLS(client));
      this.router.navigate(['/home']);
    }).catch(response => {
      this._success.next(response.message);
    });
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
      this.userService.getByUID(response.user.uid).subscribe(client => {
        this.auth.saveUserIntoLS(client);
        this.router.navigate(['/home']);
      }, error => {
        let user: User = {
          name: response.user.displayName,
          email: response.user.email,
          uid: response.user.uid
        };

        this.userService.create(user).subscribe(user => {
          this.authService.saveUserIntoLS(user);
          this.router.navigate(['/home']);
        });
      });
    });
  }
}
