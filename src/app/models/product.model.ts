export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  categoryId: number;
  category: Category;
  images: string[];
  taxes?: number;
}
export interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
}

export interface CreateProductDTO
  extends Omit<Product, 'id' | 'createdAt' | 'category'> {}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
