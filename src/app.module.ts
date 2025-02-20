import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { FeeModule } from './fee/fee.module';
import { SchemeModule } from './scheme/scheme.module';
import { BranchModule } from './branch/branch.module';
import { RequestModule } from './request/request.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.APP_ENV !== 'PRODUCTION',
    }),
    ProfileModule,
    FeeModule,
    SchemeModule,
    BranchModule,
    RequestModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
