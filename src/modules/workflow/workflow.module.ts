import { Module } from '@nestjs/common';
import { WorkflowRepositoryModule } from './repository/workflow.repository.module';
import { WorkflowService } from './services/workflow.service';

@Module({
    imports: [WorkflowRepositoryModule],
    exports: [WorkflowService],
    providers: [WorkflowService],
    controllers: [],
})
export class WorkflowModule {}
