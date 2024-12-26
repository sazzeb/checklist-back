import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { WorkflowService } from 'src/modules/workflow/services/workflow.service';
import { WorkFlowDoc } from 'src/modules/workflow/repository/entity/workflow.entity';

@Injectable()
export class WorkflowParsePipe implements PipeTransform {
    constructor(private readonly workflowService: WorkflowService) {}

    async transform(value: any): Promise<WorkFlowDoc> {
        const workflow: WorkFlowDoc =
            await this.workflowService.findOneById(value);
        if (!workflow) {
            throw new NotFoundException({
                statusCode: 404,
                message: 'plan.error.notFound',
            });
        }
        return workflow;
    }
}
