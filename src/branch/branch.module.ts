import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';

@Module({
  imports: [
TypeOrmModule.forFeature([Branch])
  ],
  controllers: [BranchController],
  providers: [BranchService]
})
export class BranchModule {}
