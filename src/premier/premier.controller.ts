import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get()
  getPremier(): string {
    console.log('get');
    return 'get';
  }
  @Post()
  postPremier(): string {
    console.log('post');
    return 'post';
  }
  @Patch()
  patchPremier(): string {
    console.log('patch');
    return 'patch';
  }
  @Put()
  putPremier(): string {
    console.log('put');
    return 'put';
  }
  @Delete()
  deletePremier(): string {
    console.log('delete');
    return 'delete';
  }
}
