import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductService } from 'src/app/services/products/products.service';
import { Label, Color } from 'ng2-charts';
import { PriceProductService } from 'src/app/services/priceProduct/price-product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Producto;
  products: Producto[] = [];
  loading: boolean = false;

  lineChartData = [];
  public lineChartLabels: Label[] = []
  public lineChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          tooltipItems.yLabel = tooltipItems.yLabel.toString();
          tooltipItems.yLabel = tooltipItems.yLabel.indexOf(".") > 0 ? tooltipItems.yLabel.substring(0, tooltipItems.yLabel.indexOf(".")) : tooltipItems.yLabel;
          tooltipItems.yLabel = tooltipItems.yLabel.split(/(?=(?:...)*$)/);
          tooltipItems.yLabel = tooltipItems.yLabel.join('.');
          return '$' + tooltipItems.yLabel;
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {}
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 500000,
          userCallback: function (value, index, values) {
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join('.');
            return '$' + value;
          }
        }
      }]
    },
  };

  public colors: Color[] = [
    { borderColor: '#155724', backgroundColor: 'transparent' },
    { borderColor: '#721c24', backgroundColor: 'transparent' },
  ]

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private priceProductService: PriceProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      let id = p['params']['id'];
      this.findProductById(id);
    })
  }

  findProductById(id: number) {
    this.productService.getById(id).subscribe(data => {
      this.product = data;
      this.getSimilarProducts(this.product.id);
    })
  }

  getSimilarProducts(idParent: number) {
    this.loading = true;
    this.productService.getRelated(idParent).subscribe(result => {
      this.products = result;
      this.loading = false;
    })
  }

  getScalaPrice(price: any): any {
    let prices = this.products.map((e: Producto) => e.price);
    let pos = prices.sort((a, b) => (a < b) ? -1 : 1).indexOf(price), color: String;

    if (pos == 0) {
      color = "bg-green";
    } else if (pos > 0 && ((pos * 100) / prices.length) < 30) {
      color = "bg-orange";
    } else {
      color = "bg-red";
    }
    return color;
  }

  getHistorialPrecio(idProduct) {
    this.lineChartData = [];
    this.priceProductService.getByProduct(idProduct).subscribe(
      response => {
        response.forEach(element => {
          this.lineChartData.push({ data: element['datos'], label: element['serie'] });
        });
        this.lineChartLabels = response[0].label.map(e => moment(e).format('lll'))
      }
    )
  }

}
