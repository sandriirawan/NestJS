import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query('name') name: string,
    @Query('category') category: string,
  ) {
    return this.productsService.getAllProducts(name, category);
    //   try {
    //   if (products) {
    //     return {
    //       status: 'success',
    //       data: products,
    //       message: 'Products data retrieved successfully.',
    //     };
    //   }
    // } catch (error) {
    //   throw new HttpException(
    //     'An error occurred while fetching products data',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() payload: CreateProductDto) {
    try {
      this.productsService.createProduct(payload);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('category') category: string,
  ) {
    return this.productsService.updateProduct(id, name, category);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
