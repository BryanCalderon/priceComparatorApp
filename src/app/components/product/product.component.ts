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
  products: Producto[] = [];
  loading: boolean = false;
  // = [
  //   { "id": null, "sku": "100927465", "name": "Televisor Lg 55\" (138 Cm) 4K Uhd Smart Tv", "image": "https://exitocol.vteximg.com.br/arquivos/ids/4906141/televisor-lg-55-138-cm-4k-uhd-smart-tv.jpg?v=637400360567130000", "url": "https://www.exito.com/televisor-lg-55-138-cm-4k-uhd-smart-tv-100927465-mp/p", "price": 1915000.0, "model": null, "brand": "LG", "normal_price": 3297000.0, "offer_price": 1915000.0, "update_date": "2020-11-18T04:28:56.803620Z", "store": "Exito" },
  //   { "id": null, "sku": "8806098683802", "name": "TV LG 55 Pulgadas 138 Cm 55UN7100 LED 4K-UHD Plano Smart TV", "image": "https://media.aws.alkosto.com/media/catalog/product/cache/6/small_image/280x/4275c8e8146210f1c7867d9f605120ed/8/8/8806098683802_001_1.jpg", "url": "http://www.alkosto.com/tv-lg-55-pulgadas-138-cm-55un7100-led-4k-uhd-plano-smart-tv", "price": 1799900.0, "model": null, "brand": "LG", "normal_price": 3699900.0, "offer_price": 1799900.0, "update_date": "2020-11-18T04:28:55.830036Z", "store": "Alkosto" },
  // ];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      console.log(p['params']);
      let id = p['params']['id'];
      this.findProductById(id);
    })
  }

  findProductById(id: number) {
    this.productService.getById(id).subscribe(data => {
      this.product = data;
      this.getSimilarProducts(this.product.sku);
    })
  }

  getSimilarProducts(sku: String) {
    this.loading = true;
    this.productService.searchAndSaveProducts(this.product.id, sku).subscribe(result => {
      result.forEach((item: any) => item['data'].forEach((product: any) => product['store'] = item['store']));
      this.products = [].concat.apply([], result.map((e: any) => e['data'])).sort((a: Producto, b: Producto) => (a.price < b.price ? -1 : 1));
      this.loading = false;
    })
  }

  getScalaPrice(price: any): any {
    let pos = this.products.map((e: Producto) => e.price).sort((a, b) => (a < b) ? -1 : 1).indexOf(price),
      color: String;

    switch (pos) {
      case 0:
        color = "bg-green";
        break;
      case 1:
        color = "bg-orange";
      default:
        color = "bg-red";
        break;
    }

    return color;
  }

}
