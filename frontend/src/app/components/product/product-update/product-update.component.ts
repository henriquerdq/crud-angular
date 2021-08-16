import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../templates/header/header.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private headerService: HeaderService) {

    headerService.headerData = {
      title: "Cadastro Produto",
      icon: "storefront",
      routerUrl: "/products"
    }
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      })
    }
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(
      () => {
        this.productService.showMessage("Operação executada");
        this.router.navigate(["/products"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

}
