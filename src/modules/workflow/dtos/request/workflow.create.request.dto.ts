import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';

export class WorkflowCreateRequestDto {
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
        example: faker.date.timeZone(),
    })
    @IsNotEmpty()
    @IsDate()
    plan_date: Date;

    @ApiProperty({
        required: true,
        description: 'Start time',
        example: faker.date.timeZone(),
    })
    @IsNotEmpty()
    @IsDate()
    start_time: string;

    @ApiProperty({
        required: true,
        description: 'Start time',
        example: faker.date.timeZone(),
    })
    @IsNotEmpty()
    @IsDate()
    ent_time: string;

    @ApiProperty({
        required: false,
        description: 'Make a plan list',
        example: [
            faker.helpers.arrayElement([
                faker.lorem.sentence,
                faker.lorem.sentence,
            ]),
        ],
        isArray: true,
    })
    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    plan_list?: string[];

    @ApiProperty({
        example: faker.string.uuid(),
        required: true,
    })
    @IsNotEmpty()
    @IsUUID()
    user: string;
}
