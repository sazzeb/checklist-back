import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class WorkflowDailyResponseDto extends DatabaseDto {
    @ApiProperty({
        required: true,
        description: 'Current date',
        example: new Date(),
    })
    @IsNotEmpty()
    @IsDate({ message: 'Plan date must be a valid date' })
    plan_date: Date;
}
