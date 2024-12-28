import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { WorkflowListResponseDto } from './workflow.list.response.dto';
import { Exclude, Expose } from 'class-transformer';

export class WorkflowShortResponseDto extends OmitType(
    WorkflowListResponseDto,
    [
        'createdAt',
        'updatedAt',
        'plan_list',
        'plan',
        'start_time',
        'end_time',
        'plan_date',
    ]
) {
    @Expose()
    _id: string;

    @Expose()
    plan_date: Date;

    @Expose()
    start_time: Date;

    @Expose()
    end_time: Date;

    @ApiHideProperty()
    @Exclude()
    plan: string;

    @ApiHideProperty()
    @Exclude()
    plan_list?: string[];

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;
}
