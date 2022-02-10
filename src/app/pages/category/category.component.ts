import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-category',
  /* templateUrl: './category.component.html', */
  template: `<app-products
    [products]="products"
    (loadMore)="onLoadMore($event)"
  ></app-products> `,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId!: string | null;

  products: Product[] = [];
  limit = 2;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(
              Number(this.categoryId),
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => console.log(error),
      });
  }

  loadProducts() {
    this.productsService
      .getByCategory(Number(this.categoryId), this.limit, this.offset)
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
