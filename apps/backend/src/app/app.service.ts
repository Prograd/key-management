import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'schokobonsiara 🍬 jest the best' };
  }
}
