import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Public } from 'src/auth/decorators/public-route.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';

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

  @Get('private')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return "private route";
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  
  }
}
