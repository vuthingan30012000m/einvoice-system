import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { scrypt } from 'crypto';
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function comparePasswords(hashedPassword: string, plainPassword: string) {
  const [hashed, salt] = hashedPassword.split('.');
  const buf = (await scryptAsync(plainPassword, salt, 64)) as Buffer;
  return buf.toString('hex') === hashed;
}

(async () => {
  const plainPassword = 'your_plain_password_here';
  let hashedPassword = await hashPassword(plainPassword);
  const isMatch = await comparePasswords(hashedPassword, plainPassword);
})();
