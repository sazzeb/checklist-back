import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class WorkflowUpdateRequestDto {
    @ApiProperty({
        required: true,
        description: 'Making a next plan',
        example: faker.lorem.sentence(),
        maxLength: 200,
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    @MinLength(1)
    plan?: string;

    @ApiProperty({
        required: true,
        description: 'Current date',
        example: new Date(),
    })
    @IsNotEmpty({ message: 'Plan date must not be empty' })
    @IsDate({ message: 'Plan date must be a valid date' })
    @Type(() => Date)
    plan_date: Date;

    @ApiProperty({
        required: true,
        description: 'Start time with date included.',
        example: new Date().toISOString(), // ISO 8601 format
    })
    @IsNotEmpty({ message: 'Start time must not be empty.' })
    @IsDate({ message: 'Start time must be a valid date and time.' })
    @Type(() => Date)
    start_time: Date;

    @ApiProperty({
        required: true,
        description: 'Start time with date included.',
        example: new Date().toISOString(), // ISO 8601 format
    })
    @IsNotEmpty({ message: 'Start time must not be empty.' })
    @IsDate({ message: 'Start time must be a valid date and time.' })
    @Type(() => Date)
    end_time: Date;

    @ApiProperty({
        required: false,
        description: 'Make a plan list',
        example: [faker.lorem.sentence(3), faker.lorem.sentence(4)],
        isArray: true,
    })
    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    plan_list?: string[];
}
