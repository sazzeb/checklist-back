import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class WorkflowRateResponseDto extends DatabaseDto {
    @ApiProperty({
        required: false, // Marked as optional
        description: 'Plan rating must be either 1, 3, or 5.',
        example: 3,
    })
    @IsIn([1, 3, 5], { message: 'Plan must be either 1, 3, or 5.' })
    rating?: number;
}
