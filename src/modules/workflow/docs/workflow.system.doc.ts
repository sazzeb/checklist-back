import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator';
import { WorkflowGetResponseDTO } from '../dtos/response/workflow.get.response.dto';
import { WorkflowListResponseDto } from '../dtos/response/workflow.list.response.dto';

export function WorkflowSystemGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'Get Doc workflow Documentation' }),
        DocAuth({ xApiKey: true }),
        DocResponsePaging<WorkflowGetResponseDTO>('plan.create', {
            dto: WorkflowGetResponseDTO,
        })
    );
}

export function WorkflowSystemListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'Get Doc workflow Documentation' }),
        DocAuth({ xApiKey: true }),
        DocResponsePaging<WorkflowListResponseDto>('plan.index', {
            dto: WorkflowListResponseDto,
        })
    );
}
