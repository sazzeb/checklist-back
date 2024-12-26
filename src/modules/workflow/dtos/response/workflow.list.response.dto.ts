import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Exclude } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class WorkflowListResponseDto extends DatabaseDto {
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
    plan: string;

    @ApiProperty({
        required: true,
        description: 'Current date',
        example: new Date(),
    })
    @IsNotEmpty()
    @IsDate({ message: 'Plan date must be a valid date' })
    plan_date: Date;

    @ApiProperty({
        required: true,
        description: 'Start time with date included.',
        example: new Date().toISOString(), // ISO 8601 format
    })
    @IsNotEmpty({ message: 'Start time must not be empty.' })
    @IsDate({ message: 'Start time must be a valid date and time.' })
    start_time: Date;

    @ApiProperty({
        required: true,
        description: 'Start time with date included.',
        example: new Date().toISOString(), // ISO 8601 format
    })
    @IsNotEmpty({ message: 'Start time must not be empty.' })
    @IsDate({ message: 'Start time must be a valid date and time.' })
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

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    updatedAt: Date;

    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    user: string;

    @ApiHideProperty()
    @Exclude()
    deletedAt?: Date;
}
