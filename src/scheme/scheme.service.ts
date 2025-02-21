import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scheme } from 'src/scheme/scheme.entity';
import { Repository } from 'typeorm';
import { CreateSchemeDto, UpdateSchemeDto } from './scheme.dto';

@Injectable()
export class SchemeService {
  constructor(
    @InjectRepository(Scheme) private schemeRepo: Repository<Scheme>,
  ) {}

  async create(dto: CreateSchemeDto) {
    const newScheme = await this.schemeRepo.create(dto);
    return this.schemeRepo.save(newScheme);
  }
  
  async findAll() {
  return this.schemeRepo.find()
  }
  
  async update(id: string, updateData: UpdateSchemeDto): Promise<Scheme> {
    // Find the existing scheme
    const scheme = await this.schemeRepo.findOne({ where: { id } });
    if (!scheme) throw new NotFoundException('Scheme not found');

    // Merge existing scheme with new updateData
    const updatedScheme = this.schemeRepo.merge(scheme, updateData);

    return await this.schemeRepo.save(updatedScheme);
  }
}
