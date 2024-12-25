import { Module } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesUserModule } from 'src/router/routes/routes.user.module';
import { RoutesPublicModule } from 'src/router/routes/routes.public.module';
import { RoutesAdminModule } from 'src/router/routes/routes.admin.module';
import { RoutesSystemModule } from 'src/router/routes/routes.system.module';
import { RoutesSharedModule } from 'src/router/routes/routes.shared.module';
import { RoutesWorkflowModule } from './routes/routes.workflow.module';

@Module({
    providers: [],
    exports: [],
    controllers: [],
    imports: [
        RoutesPublicModule,
        RoutesSystemModule,
        RoutesUserModule,
        RoutesAdminModule,
        RoutesSharedModule,
        RoutesWorkflowModule,
        NestJsRouterModule.register([
            {
                path: '/public',
                module: RoutesPublicModule,
            },
            {
                path: '/system',
                module: RoutesSystemModule,
            },
            {
                path: '/admin',
                module: RoutesAdminModule,
            },
            {
                path: '/user',
                module: RoutesUserModule,
            },
            {
                path: '/shared',
                module: RoutesSharedModule,
            },
            {
                path: 'workflow',
                module: RoutesWorkflowModule,
            },
        ]),
    ],
})
export class RouterModule {}
