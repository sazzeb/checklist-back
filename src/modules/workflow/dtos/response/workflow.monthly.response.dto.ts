import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class WorkflowMonthlyResponseDto extends DatabaseDto {
    @ApiProperty({
        required: true,
        description: 'Current year',
        example: 2024,
    })
    @IsNotEmpty()
    @IsInt({ message: 'Year must be an integer' })
    @Min(1900, { message: 'Year must be greater than or equal to 1900' }) // Adjust minimum as needed
    year: number;

    @ApiProperty({
        required: true,
        description: 'Current month',
        example: 12,
    })
    @IsNotEmpty()
    @IsInt({ message: 'Month must be an integer' })
    @Min(1, { message: 'Month must be between 1 and 12' })
    @Max(12, { message: 'Month must be between 1 and 12' })
    month: number;
}
