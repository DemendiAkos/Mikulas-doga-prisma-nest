import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { KidService } from './kid.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('children')
export class KidController {
  constructor(private readonly kidService: KidService) {}

  @Post()
  create(@Body() createKidDto: CreateKidDto) {
    return this.kidService.create(createKidDto);
  }

  @Get()
  findAll() {
    return this.kidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidService.remove(+id);
  }

  @Put(':kidID/toys/:toyID')
  async addToyToKid(@Param('kidID') kidID: string, @Param('toyID') toyID: string) {
    return this.kidService.addToyToKid(+kidID, +toyID);
  }

  @Delete(':kidID/toys/:toyID')
  async removeToyFromKid(@Param('kidID') kidID: string, @Param('toyID') toyID: string) {
    return this.kidService.removeToyFromKid(+kidID, +toyID);
  }

  
}
