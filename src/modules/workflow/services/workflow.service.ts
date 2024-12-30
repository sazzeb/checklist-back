import { BadRequestException, Injectable } from '@nestjs/common';
import { IWorkflowService } from '../interfaces/workflow.service.interface';
import { WorkflowRepository } from '../repository/repositories/workflow.repositories';
import { Document } from 'mongoose';
import {
    IDatabaseAggregateOptions,
    IDatabaseCreateManyOptions,
    IDatabaseDeleteManyOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseOptions,
    IDatabaseSaveOptions,
    IDatabaseUpdateOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    WorkFlowDoc,
    WorkFlowEntity,
} from 'src/modules/workflow/repository/entity/workflow.entity';
import { WorkflowCreateRequestDto } from 'src/modules/workflow/dtos/request/workflow.create.request.dto';
import { WorkflowListResponseDto } from '../dtos/response/workflow.list.response.dto';
import { plainToInstance } from 'class-transformer';
import { WorkflowUpdateRequestDto } from '../dtos/request/workflow.update.request.dto';
import { WorkflowFilterStartEnd } from '../constants/workflow.filter.start.end';
import { WorkflowShortResponseDto } from '../dtos/response/workflow.short.response.dto';
import { tr } from '@faker-js/faker';
import console from 'node:console';

@Injectable()
export class WorkflowService implements IWorkflowService {
    constructor(private readonly workflowRepository: WorkflowRepository) {}

    async createPlan(
        body: WorkflowCreateRequestDto,
        options?: IDatabaseCreateManyOptions
    ): Promise<WorkFlowDoc> {
        const create: WorkFlowEntity = new WorkFlowEntity();
        create.plan = body.plan;
        create.plan_date = body.plan_date;
        create.start_time = body.start_time;
        create.end_time = body.end_time;
        create.user = body.user;
        create.plan_list = body.plan_list;

        return this.workflowRepository.create(create, options);
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkFlowDoc[]> {
        return this.workflowRepository.findAll<WorkFlowDoc>(find, options);
    }

    async findShortLimited(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkFlowDoc[]> {
        return this.workflowRepository.findSelect(find, options);
    }

    async findAllByUserAndPlanDate(
        userId: string,
        planDate: string,
        search?: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkFlowDoc[]> {
        return this.workflowRepository.findAll<WorkFlowDoc>(
            { user: userId, plan_date: planDate, ...search },
            options
        );
    }

    async update(
        plan: WorkFlowDoc,
        body: WorkflowUpdateRequestDto,
        options?: IDatabaseSaveOptions
    ): Promise<WorkFlowDoc> {
        plan.plan_list = body.plan_list;
        plan.plan_date = body.plan_date;
        plan.plan_date = body.plan_date;
        plan.end_time = body.end_time;
        plan.start_time = body.start_time;

        return this.workflowRepository.save(plan, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkFlowDoc> {
        return this.workflowRepository.findOneById(_id, options);
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkFlowDoc> {
        return this.workflowRepository.findOne(find, options);
    }

    async findOneByUser(
        user: string,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkFlowDoc> {
        return this.workflowRepository.findOne({ user }, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.workflowRepository.getTotal(find, options);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseDeleteManyOptions
    ): Promise<boolean> {
        await this.workflowRepository.deleteMany(find, options);

        return true;
    }

    async mapList(
        workflow: WorkFlowDoc[] | WorkFlowEntity[]
    ): Promise<WorkflowListResponseDto[]> {
        return plainToInstance(
            WorkflowListResponseDto,
            workflow.map((e: WorkFlowDoc | WorkFlowEntity) =>
                e instanceof Document ? e.toObject() : e
            )
        );
    }

    async mapListShort(
        workflow: WorkFlowDoc[] | WorkFlowEntity[]
    ): Promise<WorkflowShortResponseDto[]> {
        return plainToInstance(
            WorkflowListResponseDto,
            workflow.map((e: WorkFlowDoc | WorkFlowEntity) =>
                e instanceof Document ? e.toObject() : e
            )
        );
    }

    async filterWorkflowsByTime(
        userId: string,
        planDate: Date,
        startTime: Date,
        endTime: Date
    ): Promise<WorkFlowDoc[]> {
        WorkflowFilterStartEnd(
            planDate,
            startTime,
            endTime,
            'Creating a to plan must be schedule 15 minute from the current time.',
            'Start time must be less than end time.'
        );
        // Check for overlaps in the database
        const plans = await this.workflowRepository.exists({
            user: userId,
            plan_date: {
                $eq: planDate, // Match specific date
            },
            $or: [
                {
                    $and: [
                        { start_time: { $lte: endTime } }, // Existing start_time is before or at requested endTime
                        { end_time: { $gte: startTime } }, // Existing end_time is after or at requested startTime
                    ],
                },
            ],
        });

        // If there are overlapping plans, throw an exception
        if (plans) {
            throw new BadRequestException({
                message:
                    'The plan time already exists. Choose a different time.',
            });
        }

        return;
    }

    async filterWorkflowsByTimeUpdated(
        _id: string,
        userId: string,
        planDate: Date,
        startTime: Date,
        endTime: Date
    ): Promise<void> {
        WorkflowFilterStartEnd(
            planDate,
            startTime,
            endTime,
            'Creating a plan must be scheduled at least 15 minutes from the current time.',
            'Start time must be less than end time Provided.'
        );

        // Check for overlaps in the database, excluding the current record (_id)
        const plans = await this.workflowRepository.exists({
            user: userId,
            plan_date: {
                $eq: planDate, // Match specific date
            },
            _id: { $ne: _id }, // Exclude the current record
            $or: [
                {
                    $and: [
                        { start_time: { $lte: endTime } }, // Existing start_time is before or at requested endTime
                        { end_time: { $gte: startTime } }, // Existing end_time is after or at requested startTime
                    ],
                },
            ],
        });

        // If there are overlapping plans, throw an exception
        if (plans) {
            throw new BadRequestException({
                message:
                    'The plan time already exists. Choose a different time.',
            });
        }

        return;
    }

    async updateWorkflowRating(
        user: string,
        _id: string,
        rating: number,
        options?: IDatabaseUpdateOptions
    ): Promise<WorkFlowDoc> {
        let completion_percentage: number;

        const rated: boolean = await this.workflowRepository.exists({
            user,
            _id,
            isDone: true,
        });

        if (rated) {
            throw new BadRequestException({
                message:
                    'Sorry plans cannot be rated twice, one rating is enough',
            });
        }

        if (rating === 5) {
            completion_percentage = 100;
        } else if (rating === 3) {
            completion_percentage = 60;
        } else if (rating === 1) {
            completion_percentage = 20;
        }

        return this.workflowRepository.update(
            { user, _id },
            { rating, isDone: true, completion_percentage },
            options
        );
    }

    async analysisDaily(
        user: string,
        planDate: Date,
        options?: IDatabaseAggregateOptions
    ): Promise<void> {
        try {
            return await this.workflowRepository.getDailyStatistics(
                user,
                planDate,
                options
            );
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }

    async analysisWeeklyData(
        user: string,
        startDate: Date,
        endDate: Date,
        options?: IDatabaseAggregateOptions
    ): Promise<any> {
        try {
            return await this.workflowRepository.getWeeklyStatistics(
                user,
                startDate,
                endDate,
                options
            );
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }

    async analysisMonthStatistics(
        user: string,
        year: number,
        month: number,
        options?: IDatabaseAggregateOptions
    ): Promise<any> {
        try {
            return await this.workflowRepository.getMonthlyStatistics(
                user,
                year,
                month,
                options
            );
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }

    async analysisYearStatistics(
        user: string,
        year: number,
        options?: IDatabaseAggregateOptions
    ): Promise<any> {
        try {
            return await this.workflowRepository.getYearlyStatistics(
                user,
                year,
                options
            );
        } catch (err) {
            throw new BadRequestException({
                statusCode: 500,
                message: err.message,
            });
        }
    }
}
