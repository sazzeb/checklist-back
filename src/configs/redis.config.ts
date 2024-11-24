import { registerAs } from '@nestjs/config';
import process from 'node:process';

const isDocker = process.env.NODE_ENV === 'docker';

export default registerAs(
    'redis',
    (): Record<string, any> => ({
        cached: {
            host: !isDocker ? process.env.REDIS_HOST : process.env.REDIS_HOST_DOCKER,
            port: Number.parseInt(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
            username: process.env.REDIS_USERNAME,
            ttl: 5 * 1000, // 5 mins
            max: 10,
        },
        queue: {
            host: !isDocker ? process.env.REDIS_HOST : process.env.REDIS_HOST_DOCKER,
            port: Number.parseInt(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
            username: process.env.REDIS_USERNAME,
        },
    })
);
