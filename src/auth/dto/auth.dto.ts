import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Email.',
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Password.',
    example: 'wefasdf@gsa_56',
  })
  password: string;
}
