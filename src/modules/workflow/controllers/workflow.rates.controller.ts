import { ApiTags } from '@nestjs/swagger';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
} from '@nestjs/common';
import {
    WorkflowPlanRateDoc,
    WorkflowPlanStatisticsResponseDoc,
} from '../docs/workflow.plan.doc';
import { Response } from '../../../common/response/decorators/response.decorator';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
} from '../../auth/decorators/auth.jwt.decorator';
import { ApiKeyProtected } from '../../api-key/decorators/api-key.decorator';
import { AuthJwtAccessPayloadDto } from '../../auth/dtos/jwt/auth.jwt.access-payload.dto';
import { UserParsePipe } from '../../user/pipes/user.parse.pipe';
import { UserDoc } from '../../user/repository/entities/user.entity';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { WorkflowService } from '../services/workflow.service';
import { WorkflowRateRequestDto } from '../dtos/request/workflow.rate.request.dto';
import { DatabaseIdResponseDto } from '../../../common/database/dtos/response/database.id.response.dto';
import { WorkflowDailyResponseDto } from '../dtos/response/workflow.daily.response.dto';
import { WorkflowWeeklyResponseDto } from '../dtos/response/workflow.weekly.response.dto';
import { WorkflowMonthlyResponseDto } from '../dtos/response/workflow.monthly.response.dto';
import { WorkflowYearlyResponseDto } from '../dtos/response/workflow.yearly.response.dto';

@ApiTags('workflow')
@Controller({
    version: '1',
    path: '/rate',
})
export class WorkflowRatesController {
    constructor(private readonly workflowService: WorkflowService) {}

    @WorkflowPlanRateDoc()
    @Response('plan.rating')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @Put('/checked/:rate/plan')
    async rate(
        @Param('rate') _id: string,
        @Body() { rating }: WorkflowRateRequestDto,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse<DatabaseIdResponseDto>> {
        try {
            await this.workflowService.updateWorkflowRating(
                user._id,
                _id,
                rating
            );
            return {
                data: { _id: _id },
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }

    @WorkflowPlanStatisticsResponseDoc()
    @Response('plan.daily')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('statistics/daily/:plan_date')
    async dailyStatistics(
        @Param('plan_date') plan_date: string,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse> {
        try {
            const data = await this.workflowService.analysisDaily(
                user._id,
                plan_date
            );
            return {
                data: data,
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }

    @WorkflowPlanStatisticsResponseDoc()
    @Response('plan.weekly')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('statistics/weekly/:weekStart/:weekEnd')
    async weeklyStatistics(
        @Param('weekStart') weekStart: string,
        @Param('weekEnd') weekEnd: string,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse> {
        try {
            const data = await this.workflowService.analysisWeeklyData(
                user._id,
                weekStart,
                weekEnd
            );
            return {
                data: data,
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }

    @WorkflowPlanStatisticsResponseDoc()
    @Response('plan.month')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('statistics/month/:year/monthly/:month')
    async monthlyStatistics(
        @Param('year') year: number,
        @Param('month') month: number,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse> {
        try {
            const data = await this.workflowService.analysisMonthStatistics(
                user._id,
                year,
                month
            );
            return {
                data: data,
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }

    @WorkflowPlanStatisticsResponseDoc()
    @Response('plan.year')
    @AuthJwtAccessProtected()
    @ApiKeyProtected()
    @HttpCode(HttpStatus.OK)
    @Get('statistics/month/years/:year')
    async yearlyStatistics(
        @Param('year') year: number,
        @AuthJwtPayload<AuthJwtAccessPayloadDto>('_id', UserParsePipe)
        user: UserDoc
    ): Promise<IResponse> {
        try {
            const data = await this.workflowService.analysisYearStatistics(
                user._id,
                year
            );
            return {
                data: data,
            };
        } catch (e) {
            throw new BadRequestException({
                statusCode: 500,
                message: e.message,
            });
        }
    }
}
