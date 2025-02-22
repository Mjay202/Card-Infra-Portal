import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profie.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './profile.dto';
import { Scheme } from 'src/scheme/scheme.entity';
import { Branch } from 'src/branch/branch.entity';

@Injectable()
export class ProfileService {
    constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Scheme) private schemeeRepo: Repository<Scheme>,
    @InjectRepository(Branch) private BranchRepo: Repository<Branch>,
){}

    async create (dto: CreateProfileDto) {
        const { branch_id, scheme_id, ...profileDto } = dto;

        const scheme = await this.schemeeRepo.findOne({ where: { id: scheme_id } })
        if (!scheme) throw new NotFoundException('Card Scheme not found!');

        const branch = await this.BranchRepo.findOne({
          where: { id: branch_id },
        });
        if (!branch) throw new NotFoundException('Branch does not exist!');

        const newProfile = this.profileRepo.create({ ...profileDto, scheme, branch });

        return await this.profileRepo.save(newProfile);

    }

    async findAll() {
        return await this.profileRepo.find()
    }

    async findOne(id: string) {
        return await this.profileRepo.findOne({where:{id}})
    }
}
