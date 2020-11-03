import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('mainNavbar') navbar: any;

  constructor(private afAuth: AngularFireAuth, private ngZone: NgZone, private router: Router) {
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (!user) {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        })
      }
    });
  }
}
