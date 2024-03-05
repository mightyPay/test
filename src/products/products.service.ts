import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }
  getSingleProduct(productId: string) {
    const product = this.findProducts(productId)[0];
    return { ...product };
  }

  updateProducts(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProducts(productId);
    const updatedProduct = { ...product };
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (title) {
      updatedProduct.title = title;
    }
    this.products[index] = updatedProduct;
  }

  private findProducts(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('NOT FIND PRODUCT');
    }
    return [product, productIndex];
  }

  deleteProduct(prodId:string){
    const index=this.findProducts(prodId)[1];
    this.products.splice(index,1);
  }
}
