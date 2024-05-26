import {  Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevelopersService {

  constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>) {}

  create(dtoData: CreateDeveloperDto) {
   const developer = this.repository.create(dtoData)

   return this.repository.save(developer)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: string) {
    return this.repository.findOneBy({id})
  }

  async update(id: string, dtoData: UpdateDeveloperDto) {
    const developer = await this.repository.findOneBy({id}) 
    if(!developer) return null

    this.repository.merge(developer, dtoData)
    return this.repository.save(developer)
  }

  async remove (id: string){
    const developer = await this.repository.findOneBy({id});

    if(!developer) return null

    return this.repository.remove(developer)
  }

 
}
