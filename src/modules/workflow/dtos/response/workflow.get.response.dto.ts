import { Expose, Type } from 'class-transformer';

export class WorkflowGetResponseDTO {
    @Expose()
    _id: string;

    @Expose()
    plan: string;

    @Expose()
    @Type(() => Date)
    plan_date: Date;

    @Expose()
    start_time: string;

    @Expose()
    end_time: string;

    @Expose()
    plan_list: string[];

    @Expose()
    user: string;

    @Expose()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @Type(() => Date)
    updatedAt: Date;
}
