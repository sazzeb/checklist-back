import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryBase } from 'src/common/database/bases/database.repository';
import {
    WorkFlowDoc,
    WorkFlowEntity,
} from 'src/modules/workflow/repository/entity/workflow.entity';
import { InjectDatabaseModel } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';

@Injectable()
export class WorkflowRepository extends DatabaseRepositoryBase<
    WorkFlowEntity,
    WorkFlowDoc
> {
    constructor(
        @InjectDatabaseModel(WorkFlowEntity.name)
        private readonly workflowModel: Model<WorkFlowEntity>
    ) {
        super(workflowModel);
    }
}
