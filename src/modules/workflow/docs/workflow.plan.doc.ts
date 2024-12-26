import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponse,
} from 'src/common/doc/decorators/doc.decorator';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../common/doc/enums/doc.enum';
import { WorkflowCreateRequestDto } from '../dtos/request/workflow.create.request.dto';
import { WorkflowListResponseDto } from '../dtos/response/workflow.list.response.dto';
import { WorkflowUpdateRequestDto } from '../dtos/request/workflow.update.request.dto';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { WorkflowDocParamsId } from '../constants/workflow.doc.constant';
import { WorkflowShortResponseDto } from '../dtos/response/workflow.short.response.dto';

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

export function WorkflowPlanListDto(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'Create a plan',
        }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
            dto: WorkflowListResponseDto,
        }),
        DocAuth({
            xApiKey: true,
        }),
        DocResponse('plan.create', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function WorkflowPlanShortListDto(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'Create a plan',
        }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
            dto: WorkflowShortResponseDto,
        }),
        DocAuth({
            xApiKey: true,
        }),
        DocResponse('plan.create', {
            httpStatus: HttpStatus.CREATED,
        })
    );
}

export function WorkflowPlanUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'Update a plan',
        }),
        DocRequest({
            bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
            dto: WorkflowUpdateRequestDto,
        }),

        DocAuth({
            xApiKey: true,
            jwtAccessToken: true,
        }),
        DocResponse('plan.update', {
            dto: DatabaseIdResponseDto,
        })
    );
}
