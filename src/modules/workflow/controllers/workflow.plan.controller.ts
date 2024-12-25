import { WorkflowService } from '../services/workflow.service';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WorkflowCreateRequestDto } from 'src/modules/workflow/dtos/request/workflow.create.request.dto';
import { WorkflowPlanCreateDto } from 'src/modules/workflow/docs/workflow.plan.doc';
import { Response } from 'src/common/response/decorators/response.decorator';
import { ApiKeyProtected } from '../../api-key/decorators/api-key.decorator';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
} from '../../auth/decorators/auth.jwt.decorator';
import { AuthJwtAccessPayloadDto } from '../../auth/dtos/jwt/auth.jwt.access-payload.dto';
import { UserParsePipe } from '../../user/pipes/user.parse.pipe';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { WorkFlowEntity } from '../repository/entity/workflow.entity';
import { WorkflowGetResponseDTO } from '../dtos/response/workflow.get.response.dto';

@ApiTags('workflow')
@Controller({
    version: '1.0',
    path: '/plan',
})
export class WorkflowPlanController {
    constructor(private readonly workflowService: WorkflowService) {}

    @WorkflowPlanCreateDto()
    @Response('plan.create')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async create(
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        userId: UserDoc,
        @Body()
        {
            plan,
            plan_date,
            ent_time,
            start_time,
            plan_list,
        }: WorkflowCreateRequestDto
    ): Promise<IResponse<WorkflowGetResponseDTO>> {
        const user = userId._id;

        try {
            await this.workflowService.filterWorkflowsByTime(
                user,
                plan_date,
                start_time,
                ent_time
            );

            const created: WorkFlowEntity =
                await this.workflowService.createPlan({
                    plan,
                    plan_list,
                    user,
                    start_time,
                    plan_date,
                    ent_time,
                });

            return {
                data: created as WorkflowGetResponseDTO,
            };
        } catch (err) {}
    }
}
