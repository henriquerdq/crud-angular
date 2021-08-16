import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../templates/header/header.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService, private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: "Cadastro de Produtos",
      icon: "storefront",
      routerUrl: "/products"
    }
  }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(
      () => {
        this.productService.showMessage("Operação executada")
        this.router.navigate(["/products"])
      }
    )
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }

}
