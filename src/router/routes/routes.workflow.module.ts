import { Module } from '@nestjs/common';
import { WorkflowModule } from 'src/modules/workflow/workflow.module';
import { WorkflowPlanController } from 'src/modules/workflow/controllers/workflow.plan.controller';
import { UserModule } from 'src/modules/user/user.module';
import { WorkflowRatesController } from 'src/modules/workflow/controllers/workflow.rates.controller';

@Module({
    controllers: [WorkflowPlanController, WorkflowRatesController],
    providers: [],
    exports: [],
    imports: [WorkflowModule, UserModule],
})
export class RoutesWorkflowModule {}
