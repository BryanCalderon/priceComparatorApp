import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  userName = '';
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      console.log(user);
      if (user) {
        this.userName = user.displayName;
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.userName = null;
      this.router.navigate(['/login']);
    });
  }
}
