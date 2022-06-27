import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto): Promise<AuthResponseDto> {
    const { email, password } = authDto;

    const user = await this.prisma.dbUsers.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('Invalid user or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid user');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }
}
