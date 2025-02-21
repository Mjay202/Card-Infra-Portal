import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/request/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request])
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
