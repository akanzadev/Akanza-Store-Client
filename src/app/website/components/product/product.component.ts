import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetailEvent = new EventEmitter<number>();
  constructor() {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetail() {
    this.showDetailEvent.emit(this.product.id);
  }
}
