import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToyService } from './toy.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToyController {
  constructor(private readonly toyService: ToyService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toyService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.toyService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    return this.toyService.update(+id, updateToyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.toyService.remove(+id);
  }
}
