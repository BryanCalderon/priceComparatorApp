import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService, Producto } from '../home/service/home.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product: Producto;
  products: Producto[];

  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      console.log(p['params']);
      let id = p['params']['id'];
      this.findProductById(id);
    })
    this.getProductsMasBuscados();
  }


  findProductById(id: number) {
    this.homeService.getById(id).subscribe(data => {
      this.product = data;
    })
  }

  getProductsMasBuscados() {
    this.homeService.get().subscribe(data => {
      this.products = data['results'];
    })
  }

}
