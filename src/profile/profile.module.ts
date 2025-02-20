import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profie.entity';
import { Scheme } from 'src/scheme/scheme.entity';
import { Branch } from 'src/branch/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Scheme, Branch])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
