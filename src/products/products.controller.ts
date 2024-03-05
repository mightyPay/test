import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generateId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generateId };
  }
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodTescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProducts(
      prodId,
      prodTitle,
      prodTescription,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProducts(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
