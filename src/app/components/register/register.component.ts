import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  loginForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    identification: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  ngOnInit(): void {
    this._success.subscribe(message => this.errorMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = '');
  }

  createUser() {
    if (this.loginForm.value.password == this.loginForm.value.confirmPassword) {
      this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(response => {
        response.user.updateProfile({ displayName: [this.loginForm.value.nombres, this.loginForm.value.apellidos].join(" ") }).then(() => {
          let user: User = {
            name: this.loginForm.value.name,
            last_name: this.loginForm.value.lastName,
            identification: this.loginForm.value.identification,
            email: this.loginForm.value.email,
            uid: response.user.uid
          };

          this.userService.create(user).subscribe(user => {
            this.authService.saveUserIntoLS(user);
            this.router.navigate(['/home']);
          });
        }).catch(response => this._success.next(response.message))
      }).catch(response => this._success.next(response.message));
    } else {
      this.loginForm.patchValue({ password: '', confirmPassword: '' });
      this._success.next("Las contraseñas no coinciden");
    }
  }
}
