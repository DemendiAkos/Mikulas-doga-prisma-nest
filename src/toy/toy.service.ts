import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToyService {
  db: PrismaService;
 
  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createToyDto: CreateToyDto) {
    return this.db.toy.create({
        data: createToyDto
      }
    );
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.db.toy.findUnique({where: {toyID: id}, include: {kids: true}});
    
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }else {
      return toy;
    }
  }

  
  async remove(id: number) {
    try {
      const toy = await this.db.toy.delete({where: {toyID: id}});
      return toy;
    } catch (error) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }
  }


  async update(id: number, updateToyDto: UpdateToyDto) {
    try  {
      const toy = await this.db.toy.update({
        where: {toyID: id},
        data: updateToyDto
      })
    } catch (error) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    } 
  }

}
