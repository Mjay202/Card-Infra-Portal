import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto, UpdateRequestDto } from './request.dto';
import { CardRequestStatus, CardRequestStatusTrack } from 'src/common/types';
import { resourceUsage } from 'process';

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

    async process(id: string) {
        const request = await this.findOne(id);
        if (!request) throw new NotFoundException('Request not found');
        let message: string;

        switch (request.status) {
          case CardRequestStatus.PENDING:
            if (request.status_track === CardRequestStatusTrack.UNTRACKED) {
              request.status = CardRequestStatus.PENDING;
                request.status_track = CardRequestStatusTrack.DOWNLOADED;
                message = 'Production file has been downloaded';
            } else {
                request.status = CardRequestStatus.IN_PROGRESS;
                message = 'Processing in progress'
            }
            break;
          case CardRequestStatus.IN_PROGRESS:
                request.status = CardRequestStatus.READY;
                request.status_track = CardRequestStatusTrack.AWAITING_DISPATCH;
                message = 'Processing completed and batch ready for dispatch.'
            break;
          case CardRequestStatus.READY:
            if (
              request.status_track === CardRequestStatusTrack.AWAITING_DISPATCH
            ) {
              request.status = CardRequestStatus.READY;
                request.status_track = CardRequestStatusTrack.DISPATCHED;
                message = 'Card batch has been successfully sent to dispatch'
            } else {
                request.status = CardRequestStatus.ACKNOWLEDGED;
                message = 'Request acknowledged successfully'
            }
            break;
          default:
            throw new BadRequestException('Invalid request status transition');
        }

        await this.requestRepo.save(request);
        return {
            message,
            request
        };
    }

}
