import { Model } from 'mongoose';

import {
    IDatabaseDeleteManyOptions,
    IDatabaseFindAllOptions,
    IDatabaseGetTotalOptions,
    IDatabaseOptions,
    IDatabaseSaveOptions,
    IDatabaseUpdateOptions,
} from 'src/common/database/interfaces/database.interface';
import {
    WorkFlowDoc,
    WorkFlowEntity,
} from '../repository/entity/workflow.entity';
import { WorkflowListResponseDto } from '../dtos/response/workflow.list.response.dto';
import { WorkflowUpdateRequestDto } from '../dtos/request/workflow.update.request.dto';
import { WorkflowShortResponseDto } from '../dtos/response/workflow.short.response.dto';

export interface IWorkflowService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkFlowDoc[]>;

    findAllByUserAndPlanDate(
        user: string,
        planDate: string,
        search?: any,
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

    update(
        repository: WorkFlowDoc,
        {
            plan,
            plan_date,
            plan_list,
            start_time,
            end_time,
        }: WorkflowUpdateRequestDto,
        options?: IDatabaseUpdateOptions
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

    mapList(
        workflows: WorkFlowDoc[] | WorkFlowEntity[]
    ): Promise<WorkflowListResponseDto[]>;

    mapListShort(
        workflows: WorkFlowDoc[] | WorkFlowEntity[]
    ): Promise<WorkflowShortResponseDto[]>;
    updateWorkflowRating(
        userId: string,
        repositoryId: string,
        repository: number,
        options: IDatabaseSaveOptions
    ): Promise<WorkFlowDoc>;
}
