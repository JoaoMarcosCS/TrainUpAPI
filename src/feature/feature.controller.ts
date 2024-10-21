import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Public } from 'src/auth/decorators/public-route.decorator';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) { }

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    
  }

  @Get('public')
  @Public()
  findAll() {
    return "public route"
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  
  }
}
