import { Module } from '@nestjs/common';
import { WorkflowRepository } from './repositories/workflow.repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkFlowEntity, WorkFlowEntitySchema } from './entity/workflow.entity';
import { DATABASE_CONNECTION_NAME } from '../../../common/database/constants/database.constant';

@Module({
    providers: [WorkflowRepository],
    exports: [WorkflowRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: WorkFlowEntity.name,
                    schema: WorkFlowEntitySchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class WorkflowRepositoryModule {}
