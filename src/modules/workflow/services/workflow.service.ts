import { BadRequestException, Injectable } from '@nestjs/common';
import { IWorkflowService } from '../interfaces/workflow.service.interface';
import { WorkflowRepository } from '../repository/repositories/workflow.repositories';
import {
    IDatabaseCreateManyOptions,
    IDatabaseDeleteManyOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    WorkFlowDoc,
    WorkFlowEntity,
} from 'src/modules/workflow/repository/entity/workflow.entity';
import { WorkflowCreateRequestDto } from 'src/modules/workflow/dtos/request/workflow.create.request.dto';
import { use } from 'passport';

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

    async filterWorkflowsByTime(
        userId: string,
        planDate: Date,
        startTime: Date,
        endTime: Date
    ): Promise<WorkFlowDoc[]> {
        const now = new Date();
        const currentTimePlus30Min = new Date(now.getTime() + 15 * 60 * 1000); // Current time + 30 minutes

        // Ensure start_time is at least 30 minutes greater than the current time
        if (startTime <= currentTimePlus30Min) {
            throw new BadRequestException({
                message:
                    'Creating a to plan must be schedule 15 minute from the current time.',
            });
        }

        // Ensure start_time is less than end_time
        if (startTime >= endTime) {
            throw new BadRequestException({
                message: 'Start time must be less than end time.',
            });
        }

        // Ensure start_time and end_time correspond to the same day as plan_date
        const isSameDay = (date: Date, targetDate: Date) => {
            return (
                date.getUTCFullYear() === targetDate.getUTCFullYear() &&
                date.getUTCMonth() === targetDate.getUTCMonth() &&
                date.getUTCDate() === targetDate.getUTCDate()
            );
        };

        if (!isSameDay(startTime, planDate) || !isSameDay(endTime, planDate)) {
            throw new BadRequestException({
                message:
                    'Start time and end time must correspond to the same day as the plan date.',
            });
        }

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
}
