import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request) private requestRepo: Repository<Request>
    ) { }
    
    
}
