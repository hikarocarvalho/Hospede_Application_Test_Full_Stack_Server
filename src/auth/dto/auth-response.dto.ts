import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Return one jwt value',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTY1NjIyNTE1NywiZXhwIjoxNjU2MjY4MzU3fQ.xqTfXxJ4-2MLrsdm4m-5ff4CZ6xmdtW74_28MRuz2D0',
  })
  token: string;

  @ApiProperty({
    description: 'Data values from an authenticated user.',
  })
  user: User;
}
