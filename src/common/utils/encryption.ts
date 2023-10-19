import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CRYPTO } from '../constants';

@Injectable()
export class Encryption {
  encryption(data: string) {
    const cipher = crypto.createCipheriv(
      CRYPTO.algorithm,
      Buffer.from(CRYPTO.code),
      CRYPTO.ivCode,
    );
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  decryption(data: string) {
    const decipher = crypto.createDecipheriv(
      CRYPTO.algorithm,
      Buffer.from(CRYPTO.code),
      CRYPTO.ivCode,
    );
    let decryptedData = decipher.update(data, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }
}
