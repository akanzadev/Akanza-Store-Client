import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParamMap.subscribe((params) => {
      const productId = params.get('product');
      if (productId) {
        this.productId = productId;
      }
    });
  }
  loadProducts() {
    this.productService
      .getAll(this.limit, this.offset)
      .subscribe((products) => {
        this.products = [...this.products, ...products];
      });
  }

  loadMoreProducts() {
    this.offset += this.limit;
    this.loadProducts();
  }

  onLoadMore(e: Boolean) {
    this.loadMoreProducts();
  }
}
