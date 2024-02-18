import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { scrypt } from 'crypto';
import { Injectable } from '@nestjs/common';
const scryptAsync = promisify(scrypt);

@Injectable()
export class HashPasswordService {
  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  async comparePasswords(hashedPassword: string, plainPassword: string) {
    const [hashed, salt] = hashedPassword.split('.');
    const buf = (await scryptAsync(plainPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashed;
  }
}
