import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Producto;
  products: Producto[];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      console.log(p['params']);
      let id = p['params']['id'];
      this.findProductById(id);
    })
    this.getProductsMasBuscados();
  }


  findProductById(id: number) {
    this.productService.getById(id).subscribe(data => {
      this.product = data;
    })
  }

  getProductsMasBuscados() {
    this.productService.get().subscribe(data => {
      this.products = data['results'];
    })
  }

}
