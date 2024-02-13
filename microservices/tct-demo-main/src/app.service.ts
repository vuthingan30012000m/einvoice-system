import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getRandomValue() {
    const ACCEPTANCE_RATE = 0.5;
    const random_choose = Math.random();

    if (random_choose < ACCEPTANCE_RATE) {
      return uuidv4();
    }

    return null;
  }
}
