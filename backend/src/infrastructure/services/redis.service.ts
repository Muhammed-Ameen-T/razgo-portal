import { createClient } from 'redis';
import { injectable } from 'inversify';
import { ICacheService } from '../../domain/interfaces/services/ICacheService';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';
import { env } from '../../config/env.config';
import { SuccessMsg } from '../../utils/constants/commonSuccessMsg.constants';

@injectable()
export class RedisService implements ICacheService {
  private _client: ReturnType<typeof createClient>;

  constructor() {
    this._client = createClient({
      url: env.REDIS_URL,
    });

    this._client.on('error', (err) => console.error(ErrorMsg.REDIS_CONNECTION_ERROR, err));

    this.connect();
  }

  private async connect() {
    if (!this._client.isOpen) {
      await this._client
        .connect()
        .then(() => {
          console.log(SuccessMsg.REDIS_CONNECTED);
        })
        .catch((err) => {
          console.error(ErrorMsg.REDIS_CONNECTION_ERROR, err);
        });
    }
  }

  async set(key: string, value: string, expirySeconds: number): Promise<void> {
    try {
      await this._client.setEx(key, expirySeconds, value);
    } catch (error) {
      throw new Error('Redis set failed');
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this._client.get(key);
    } catch (error) {
      throw new Error('Redis get failed');
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this._client.del(key);
    } catch (error) {
      throw new Error('Redis delete failed');
    }
  }
}
