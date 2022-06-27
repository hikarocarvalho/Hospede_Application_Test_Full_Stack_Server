import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoggedUser } from './logged-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Make user login.',
  })
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Get()
  @UseGuards(AuthGuard(''))
  @ApiOperation({
    summary: 'Return Authorized user',
  })
  @ApiBearerAuth()
  profile(@LoggedUser() user: User) {
    return user;
  }
}
