import { registerAs } from '@nestjs/config';

export default registerAs(
    'email',
    (): Record<string, any> => ({
        name: process.env.APP_NAME,
        fromEmail: 'info@enrolledagent.com',
        supportEmail: 'info@enrolledagent.com',

        clientUrl: process.env.CLIENT_URL ?? 'EnrolledAgent.com',
    })
);
