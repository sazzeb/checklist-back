import { registerAs } from '@nestjs/config';
import { version } from 'package.json';
import process from 'node:process';

const isDocker = process.env.NODE_ENV === 'docker';
export default registerAs(
    'app',
    (): Record<string, any> => ({
        name: process.env.APP_NAME,
        env: process.env.APP_ENV,
        timezone: process.env.APP_TIMEZONE,
        repoVersion: version,
        globalPrefix: '/api',

        http: {
            host: !isDocker ? process.env.HTTP_HOST : process.env.HTTP_HOST_DOCKER,
            port: Number.parseInt(!isDocker ? process.env.HTTP_PORT : process.env.HTTP_PORT_DOCKER),
        },
        urlVersion: {
            enable: process.env.URL_VERSIONING_ENABLE === 'true',
            prefix: 'v',
            version: process.env.URL_VERSION,
        },
    })
);
