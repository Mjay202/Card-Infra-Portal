import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from 'src/users/user.dto';
import { mapUserDataToResponse } from 'src/utils/map-user-data-to-response';
import { UserLoginCredentials } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<UserLoginCredentials | null> {
    // Get user Login Credentials
    const user = await this.usersService.getLoginCredentials(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await argon2.verify(user.password, password.trim());
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async register(userDto: CreateUserDto) {
    // Checking if email already exists
    const existingUser = await this.usersService.checkIfUserExists(
      userDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username is already in use');
    }

    // Create new user
    const user = await this.usersService.create({
      name: userDto.name,
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
    });

    // Return user details without password
    return mapUserDataToResponse(user);
  }

  async login(dto: UserLoginDto) {
    // Checking user validation
    const user = await this.validateUser(dto.username, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    };
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
