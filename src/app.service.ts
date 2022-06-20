import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to my list API <br> link to swagger <a href="/api">api documentation</a>';
  }
}
