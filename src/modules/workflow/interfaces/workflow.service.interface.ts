import { Model } from 'mongoose';

import {
    IDatabaseDeleteManyOptions,
    IDatabaseFindAllOptions,
    IDatabaseGetTotalOptions,
    IDatabaseOptions,
} from 'src/common/database/interfaces/database.interface';
import { WorkFlowDoc } from '../repository/entity/workflow.entity';

export interface IWorkflowService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkFlowDoc[]>;

    findOne(
        find: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<WorkFlowDoc>;

    findOneByUser(
        user: string,
        options?: IDatabaseOptions
    ): Promise<WorkFlowDoc>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseDeleteManyOptions
    ): Promise<boolean>;

    filterWorkflowsByTime(
        userId: string,
        planDate: Date,
        startTime: Date,
        endTime: Date
    ): Promise<WorkFlowDoc[]>;
}
