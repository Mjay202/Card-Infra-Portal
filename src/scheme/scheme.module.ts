import { Module } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { SchemeController } from './scheme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scheme } from 'src/scheme/scheme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scheme])],
  providers: [SchemeService],
  controllers: [SchemeController],
})
export class SchemeModule {}
