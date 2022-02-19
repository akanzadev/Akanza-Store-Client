import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { switchMap, catchError, of, Observable } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryId!: string | null;
  productId: string | null = null;

  products: Product[] = [];
  limit = 2;
  offset = 0;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(
              Number(this.categoryId),
              this.limit,
              this.offset
            );
          } else {
            this.router.navigate(['/']);
          }
          return [];
        })
      )
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.log(error);
        },
      }); */
    this.route.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
        this.offset = 0;
        console.log(this.categoryId);
        if (!this.categoryId) {
          this.router.navigate(['/']);
          return;
        }
        this.productsService
          .getByCategory(Number(this.categoryId), this.limit, this.offset)
          .subscribe({
            next: (products) => {
              this.products = products;
            },
            error: (error) => {
              this.products = [];
            },
          });
      },
    });
    this.route.queryParamMap.subscribe((params) => {
      const productId = params.get('product');
      if (!productId) {
        this.productId = null;
      }
      this.productId = productId;
    });
  }

  loadProducts() {
    this.productsService
      .getByCategory(Number(this.categoryId), this.limit, this.offset)
      .subscribe({
        next: (products) => {
          this.products = [...this.products, ...products];
        },
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
