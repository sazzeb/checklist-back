import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class WorkflowYearlyResponseDto extends DatabaseDto {
    @ApiProperty({
        required: true,
        description: 'Current year',
        example: 2024,
    })
    @IsNotEmpty()
    @IsInt({ message: 'Year must be an integer' })
    @Min(1900, { message: 'Year must be greater than or equal to 1900' }) // Adjust minimum as needed
    year: number;
}
