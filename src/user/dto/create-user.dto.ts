import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Receive one name from the user',
    example: 'PedroAlcantara',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Receive one email from the user',
    example: 'email@email.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password.',
    example: 'wefasdf@gsa_56',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
