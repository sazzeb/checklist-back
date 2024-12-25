import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { WorkflowListResponseDto } from './workflow.list.response.dto';
import { Exclude } from 'class-transformer';

export class WorkflowShortResponseDto extends OmitType(
    WorkflowListResponseDto,
    ['createdAt', 'updatedAt', 'plan_list']
) {
    @ApiHideProperty()
    @Exclude()
    plan_list: string;

    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;
}
