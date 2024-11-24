import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import process from 'node:process';

@Injectable()
export class RedisProvider {
    private readonly logger = new Logger(RedisProvider.name);
    public client: Redis;

    constructor(private configService: ConfigService) {
        const isDocker = process.env.NODE_ENV === 'docker'; // Set this in your Docker Compose environment
        const host = !isDocker
            ? this.configService.get<string>('REDIS_HOST') // Use Docker host
            : this.configService.get<string>('REDIS_HOST_DOCKER'); // Use local host

        const port = this.configService.get<number>('REDIS_PORT') || 6379;
        const password = this.configService.get<string>('REDIS_PASSWORD') || undefined;
        const tls = this.configService.get<any>('REDIS_TLS');

        this.logger.log(`Connecting to Redis on host: ${host}, port: ${port}`);

        this.client = new Redis({
            host,
            port,
            password,
            tls,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000); // Exponential backoff
                this.logger.warn(
                    `Redis connection lost. Reconnecting in ${delay}ms...`
                );
                return delay;
            },
        });

        this.client.on('connect', () => {
            this.logger.log(`Redis connected to ${host}:${port}`);
        });

        this.client.on('error', (err) => {
            this.logger.error(`Redis connection error: ${err.message}`);
        });
    }

    async isRedisAvailable(): Promise<boolean> {
        try {
            const pong = await this.client.ping(); // Test Redis connection
            if (pong === 'PONG') {
                this.logger.log('Redis is available and ready to accept connections.');
                return true;
            }
            throw new Error('Unexpected PING response from Redis.');
        } catch (error) {
            // Log specific reasons for failure
            this.logger.error(`Redis health check failed: ${error.message}`);
            if (error instanceof Error) {
                this.logger.error(`Stack trace: ${error.stack}`);
            }
            return false;
        }
    }

    onModuleInit() {
        // Optional: Add any initialization logic here
    }

    getClient(): Redis {
        return this.client;
    }
}
