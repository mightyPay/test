import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
