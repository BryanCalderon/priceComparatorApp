import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mainNavbar') navbar: any;
  title = 'priceComparatorApp';

  ngAfterViewInit(): void {
    setTimeout(function () {
      console.log(">> ", this.navbar);
    }, 1000);

  }

}
