import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto, UpdateRequestDto } from './request.dto';
import { CardRequestStatus } from 'src/common/types';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request) private requestRepo: Repository<Request>
    ) { }
    
    async create(dto: CreateRequestDto) {
        const newRequest = this.requestRepo.create(dto)
        return await this.requestRepo.save(newRequest)
    }

    async findAll() {
        return await this.requestRepo.find()
    }

    async findOne(id: string) {
        return await this.requestRepo.findOne({ where: { id } })
    }

    async update(id: string, dto: UpdateRequestDto) {
        const request = await this.findOne(id)
        if (!request) throw new NotFoundException('Request not found');
        const updatedRequest = this.requestRepo.merge(request, dto);
        return await this.requestRepo.save(updatedRequest);
    }

    async changeStatus(id: string, status: CardRequestStatus) {
       const request = await this.findOne(id);
        if (!request) throw new NotFoundException('Request not found');
        request.status = status;
        return await this.requestRepo.save(request);
    }

}
