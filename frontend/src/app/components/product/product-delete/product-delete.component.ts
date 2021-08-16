import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../templates/header/header.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService) {

    headerService.headerData = {
      title: "Cadastro Produtos",
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

  deleteProduct(): void {
    if (this.product.id == null) {
      return;
    }

    this.productService.delete(this.product.id).subscribe(
      () => {
        this.productService.showMessage("Produto excluído");
        this.router.navigate(["/products"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }


}
