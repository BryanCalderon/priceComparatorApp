import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('mainNavbar') navbar: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
