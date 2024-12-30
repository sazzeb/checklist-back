import { WorkflowService } from '../services/workflow.service';
import { ApiTags } from '@nestjs/swagger';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { WorkflowCreateRequestDto } from 'src/modules/workflow/dtos/request/workflow.create.request.dto';
import {
    WorkflowPlanCreateDto,
    WorkflowPlanListDto,
    WorkflowPlanShortListDto,
    WorkflowPlanUpdateDoc,
} from 'src/modules/workflow/docs/workflow.plan.doc';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { ApiKeyProtected } from 'src/modules/api-key/decorators/api-key.decorator';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
} from 'src/modules/auth/decorators/auth.jwt.decorator';
import { AuthJwtAccessPayloadDto } from 'src/modules/auth/dtos/jwt/auth.jwt.access-payload.dto';
import { UserParsePipe } from 'src/modules/user/pipes/user.parse.pipe';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import {
    WorkFlowDoc,
    WorkFlowEntity,
} from '../repository/entity/workflow.entity';
import { WorkflowGetResponseDTO } from '../dtos/response/workflow.get.response.dto';
import { WorkflowListResponseDto } from '../dtos/response/workflow.list.response.dto';
import { PaginationQuery } from '../../../common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from '../../../common/pagination/dtos/pagination.list.dto';
import { PaginationService } from '../../../common/pagination/services/pagination.service';

import { RequestRequiredPipe } from '../../../common/request/pipes/request.required.pipe';
import { WorkflowParsePipe } from '../pipes/workflow.parse.pipe';
import { WorkflowUpdateRequestDto } from '../dtos/request/workflow.update.request.dto';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { WorkflowShortResponseDto } from '../dtos/response/workflow.short.response.dto';

@ApiTags('workflow')
@Controller({
    version: '1',
    path: '/plan',
})
export class WorkflowPlanController {
    constructor(
        private readonly workflowService: WorkflowService,
        private readonly paginationService: PaginationService
    ) {}

    @WorkflowPlanListDto()
    @ResponsePaging('plan.index')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('/list')
    async index(
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        userId: UserDoc,
        @PaginationQuery()
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<WorkflowListResponseDto>> {
        try {
            const find: Record<string, any> = {
                user: userId._id,
                ..._search,
            };

            const retrievePlanByUser: WorkFlowDoc[] =
                await this.workflowService.findAll(find, {
                    paging: { limit: _limit, offset: _offset },
                    order: _order,
                });

            const total: number = await this.workflowService.getTotal({
                user: userId._id,
            });

            const totalPage: number = this.paginationService.totalPage(
                total,
                _limit
            );

            const mapped =
                await this.workflowService.mapList(retrievePlanByUser);

            return {
                _pagination: { total, totalPage },
                data: mapped,
            };
        } catch (e) {
            throw new BadRequestException({
                message: e.message,
            });
        }
    }

    @WorkflowPlanListDto()
    @ResponsePaging('plan.chosen')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('/plan-date/:plan_date')
    async userChosenDate(
        @Param('plan_date') plan_date: string,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        userId: UserDoc,
        @PaginationQuery()
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<WorkflowListResponseDto>> {
        try {
            const find: Record<string, any> = {
                user: userId._id,
                plan_date: plan_date,
                ..._search,
            };

            const retrievePlanByUser: WorkFlowDoc[] =
                await this.workflowService.findAll(find, {
                    paging: { limit: _limit, offset: _offset },
                    order: _order,
                });

            const total: number = await this.workflowService.getTotal({
                user: userId._id,
            });

            const totalPage: number = this.paginationService.totalPage(
                total,
                _limit
            );

            const mapped =
                await this.workflowService.mapList(retrievePlanByUser);

            return {
                _pagination: { total, totalPage },
                data: mapped,
            };
        } catch (e) {
            throw new BadRequestException({
                message: e.message,
            });
        }
    }

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
            end_time,
            start_time,
            plan_list,
        }: WorkflowCreateRequestDto
    ): Promise<IResponse<WorkflowGetResponseDTO>> {
        try {
            const user = userId._id;

            if (!plan || !end_time || !start_time || !plan_date) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'plan.error.notPlan',
                });
            }

            await this.workflowService.filterWorkflowsByTime(
                user,
                plan_date,
                start_time,
                end_time
            );

            const created: WorkFlowEntity =
                await this.workflowService.createPlan({
                    plan,
                    plan_list,
                    user,
                    start_time,
                    plan_date,
                    end_time,
                });

            return {
                data: created as WorkflowGetResponseDTO,
            };
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }

    @WorkflowPlanUpdateDoc()
    @Response('plan.update')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @Put('/update/:plan')
    async update(
        @Param('plan', RequestRequiredPipe, WorkflowParsePipe)
        plan: WorkFlowDoc,
        @Body() payload: WorkflowUpdateRequestDto,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        try {
            await this.workflowService.filterWorkflowsByTimeUpdated(
                plan._id,
                user._id,
                payload.plan_date,
                payload.start_time,
                payload.end_time
            );
            const updated: WorkflowUpdateRequestDto =
                await this.workflowService.update(plan, payload);
            return {
                data: { _id: updated.plan, ...updated },
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }

    @WorkflowPlanShortListDto()
    @Response('plan.short')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('chosen/date/:plan_date')
    async planDateChosen(
        @Param('plan_date') plan_date: string,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse<WorkflowShortResponseDto[]>> {
        try {
            const find: Record<string, any> = {
                user: user._id,
                plan_date: plan_date,
            };
            const repository: WorkFlowDoc[] =
                await this.workflowService.findShortLimited(find);

            const mapped: WorkflowShortResponseDto[] =
                await this.workflowService.mapListShort(repository);

            return {
                data: mapped,
            };
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }
}
