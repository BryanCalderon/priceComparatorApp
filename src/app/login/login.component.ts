import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  _success = new Subject<string>();
  inputMessage = 'Unable to log in with provided credentials.';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.inputMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.inputMessage = '');
  }

  login() {
    this.auth.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('token', data.token);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this._success.next(`Usuario o contraseña no valido`);
    })
  }

}
