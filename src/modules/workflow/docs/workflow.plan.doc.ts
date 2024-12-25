import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocRequest,
    DocResponse,
} from 'src/common/doc/decorators/doc.decorator';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../common/doc/enums/doc.enum';
import { WorkflowCreateRequestDto } from '../dtos/request/workflow.create.request.dto';

export function WorkflowPlanCreateDto(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'Create a plan',
        }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
            dto: WorkflowCreateRequestDto,
        }),
        DocAuth({
            xApiKey: true,
        }),
        DocResponse('plan.create', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}
