import { Injectable } from '@nestjs/common';
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
        create.end_time = body.ent_time;
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
        startTime: string,
        endTime: string
    ): Promise<WorkFlowDoc[]> {
        const timeToMinutes = (time: string): number => {
            const [hours, minutes, period] = time
                .match(/(\d+):(\d+)\s?(AM|PM)/i)
                .slice(1);
            let totalMinutes = (parseInt(hours) % 12) * 60 + parseInt(minutes);
            if (period.toUpperCase() === 'PM') totalMinutes += 12 * 60; // Adjust for PM
            return totalMinutes;
        };

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);

        if (startMinutes >= endMinutes) {
            throw new Error('Start time must be less than end time.');
        }

        return await this.workflowRepository.findAll({
            userId: userId,
            plan_date: {
                $eq: planDate, // Match specific date
            },
            $or: [
                {
                    $and: [
                        { start_time: { $lte: endTime } },
                        { end_time: { $gte: startTime } },
                    ],
                },
            ],
        });
    }
}
