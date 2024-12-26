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
    @Type(() => Date)
    start_time: Date;

    @Expose()
    @Type(() => Date)
    end_time: Date;

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
