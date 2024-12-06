import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KidService {
  constructor (private readonly db: PrismaService) {}

  
  create(createKidDto: CreateKidDto) {
    return this.db.kid.create({
      data: createKidDto
    })
  }

  findAll() {
    return this.db.kid.findMany({include: {toys: true}});
  }

  async findOne(id: number) {
    const kid = await this.db.kid.findUnique({where: {kidID: id}, include: {toys: true}});
    if (!kid) {
      throw new NotFoundException(`Kid with ID ${id} not found`);
    }
    else {
      return kid;
    }
  }

  
  async remove(id: number) {
    try {
      const kid = await this.db.kid.delete({where: {kidID: id}});
      return kid;
    } catch (error) {
      throw new NotFoundException(`Kid with ID ${id} not found`);
    }
  }


  async update(id: number, updateKidDto: UpdateKidDto) {

    try {
      const kid = await this.db.kid.update({
        where: {kidID: id},
        data: updateKidDto
      });
      return kid;
    } catch(error) {
      throw new NotFoundException(`Kid with ID ${id} not found`);
    }
  }


  async addToyToKid(kidID: number, toyID: number) {
    
      const kid = await this.db.kid.findUnique({where: {kidID: kidID}});
      const toy = await this.db.toy.findUnique({where: {toyID: toyID}});
      if (!kid) {
        throw new NotFoundException(`Kid with ID ${kidID} not found`);
      }
      if (!toy) {
        throw new NotFoundException(`Toy with ID ${toyID} not found`);
      }

      return this.db.kid.update({
        where: {kidID: kidID},
        data: {
          toys: {
            connect: {
              toyID: toyID }
            }
          }
        });
  }


  async removeToyFromKid(kidID: number, toyID: number) {
    const kid = await this.db.kid.findUnique({where: {kidID: kidID}});
    const toy = await this.db.toy.findUnique({where: {toyID: toyID}});
    if (!kid) {
      throw new NotFoundException(`Kid with ID ${kidID} not found`);
    }
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyID} not found`);
    }


    return this.db.kid.update({
      where: {kidID: kidID},
      data: {
        toys: {
          disconnect: {
            toyID: toyID }
          }
        }
      });
      
  }


  
}
