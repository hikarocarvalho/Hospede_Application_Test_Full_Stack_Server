import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Receive one name from the user",
    example: "PedroAlcantara"
  })
  @IsString()
  userName: string;

  @ApiProperty({
    description: "Receive one email from the user",
    example: "email@email.com"
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Receive one encryption of the password. The user sends the password.",
    example: "5f4dcc3b5aa765d61d8327deb882cf99"
  })
  @IsString()
  password: string;
}
