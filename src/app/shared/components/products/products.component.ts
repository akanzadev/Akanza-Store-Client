import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(id: string | null) {
    if (id) {
      this.showDetail(Number(id));
    }
  }
  @Output() loadMore = new EventEmitter<Boolean>();
  today = new Date();
  date = new Date(2022, 1, 22);
  showProductDetail = false;
  productChosen!: Product;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCard(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  showDetail(id: number) {
    this.statusDetail = 'loading';
    this.productService.getOne(id).subscribe({
      next: (product) => this.showDetailOk(product),
      error: (error) => this.showDetailError(error),
    });
  }

  showDetailOk(product: Product) {
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productChosen = product;
    this.statusDetail = 'success';
  }

  showDetailError(error: Error) {
    this.statusDetail = 'error';
  }

  readAndUpdate(id: number) {
    // Depender una de otra
    this.productService
      .getOne(id)
      .pipe(
        switchMap((product) =>
          this.productService.update(product.id, {
            name: 'NOMBRE CAMBIADO CALBASCK',
          })
        )
      )
      .subscribe((product) => {
        console.log(product);
      });
    // No dependen
    zip(
      this.productService.getOne(id),
      this.productService.update(id, {
        name: 'NOMBRE CAMBIADO CALBASCK',
      })
    ).subscribe((response) => {
      console.log(response[0]);
      console.log(response[1]);
    });

    /*  this.productService.getOne(id).subscribe((product) => {
        this.productService
          .update(id, { name: 'NOMBRE CAMBIADO CALBASCK' })
          .subscribe((product) => {
            console.log(product);
          });
      }); */
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      name: 'Producto 3',
      price: 16.5,
      description: 'Es el producto 3',
      images: [
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
      ],
      categoryId: 1,
    };
    this.productService.create(product).subscribe((product) => {
      console.log(product);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      name: 'Producto cambiado denuevo',
      price: 50.0,
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes).subscribe((product) => {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      this.products[productIndex] = product;
      this.productChosen = product;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
