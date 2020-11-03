import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  _success = new Subject<string>();
  errorMessage = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = '');
  }

  createUser() {
    this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(response => response.user.updateProfile({ displayName: this.loginForm.value.username })
        .then(() => this.router.navigate(['/home']))
        .catch(response => this._success.next(response.message))
      ).catch(response => this._success.next(response.message));
  }
}
