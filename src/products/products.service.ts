import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductsService {
  private products: any[] = [];

  getAllProducts(name: string, category: string): any[] {
    const products = this.products.filter((product) => {
      if (name && product.name != name) {
        return false;
      }
      if (category && product.category !== -category) {
        return false;
      }
      return true;
    });
    return products;
  }

  getProduct(id: string) {
    const productIndex = this.findProductById(id);
    return this.products[productIndex];
  }

  createProduct(crateProductDto: CreateProductDto) {
    const { name, category } = crateProductDto;
    this.products.push({
      id: uuidv4(),
      name,
      category,
    });
  }

  updateProduct(id: string, name: string, category: string) {
    const productIndex = this.findProductById(id);
    this.products[productIndex].name = name;
    this.products[productIndex].category = category;
  }

  findProductById(id: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException('product not found');
    }
    return productIndex;
  }

  deleteProduct(id: string) {
    const productIndex = this.findProductById(id);
    this.products.splice(productIndex, 1);
  }
}
