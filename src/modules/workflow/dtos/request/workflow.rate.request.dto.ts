import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class WorkflowRateRequestDto {
    @ApiProperty({
        required: false, // Marked as optional
        description: 'Plan rating must be either 1, 3, or 5.',
        example: 3,
    })
    @IsIn([1, 3, 5], { message: 'Plan must be either 1, 3, or 5.' })
    rating?: number;
}
