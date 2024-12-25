import { Module } from '@nestjs/common';
import { WorkflowModule } from 'src/modules/workflow/workflow.module';
import { WorkflowPlanController } from 'src/modules/workflow/controllers/workflow.plan.controller';
import { UserModule } from '../../modules/user/user.module';

@Module({
    controllers: [WorkflowPlanController],
    providers: [],
    exports: [],
    imports: [WorkflowModule, UserModule],
})
export class RoutesWorkflowModule {}
