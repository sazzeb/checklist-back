import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { TimeZoneDto } from '../../docs/country.swagger.doc';
import { TimeZoneRegions } from '../../repository/entities/countries.objects';

export class CountryCreateRequestDto {
    @ApiProperty({
        required: true,
        description: 'Country name',
        example: faker.location.country(),
        maxLength: 100,
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    name: string;

    @ApiProperty({
        required: false,
        description: 'Country code, Alpha 2 code version',
        example: faker.location.countryCode('alpha-2'),
        maxLength: 2,
        minLength: 2,
    })
    @IsOptional()
    @IsString()
    @MaxLength(2)
    @MinLength(2)
    @Transform(({ value }) => value.toUpperCase())
    alpha2Code?: string;

    @ApiProperty({
        required: false,
        description: 'Country code, Alpha 3 code version',
        example: faker.location.countryCode('alpha-3'),
        maxLength: 3,
        minLength: 3,
    })
    @IsOptional()
    @IsString()
    @MaxLength(3)
    @MinLength(3)
    @Transform(({ value }) => value.toUpperCase())
    alpha3Code?: string;

    @ApiProperty({
        required: true,
        description: 'Country code, Numeric code version',
        example: faker.location.countryCode('numeric'),
        maxLength: 3,
        minLength: 1,
    })
    @IsOptional()
    @IsString()
    @MaxLength(3)
    @MinLength(1)
    numericCode?: string;

    @ApiProperty({
        required: false,
        description: 'Country code, FIPS version',
        example: faker.location.countryCode('alpha-2'),
        maxLength: 2,
        minLength: 2,
    })
    @IsOptional()
    @IsString()
    @MaxLength(2)
    @MinLength(2)
    fipsCode?: string;

    @ApiProperty({
        required: false,
        description: 'Country phone code',
        example: [faker.helpers.arrayElement(['62', '65'])],
        maxLength: 4,
        isArray: true,
    })
    @IsArray()
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @MaxLength(4, { each: true })
    phoneCode?: string;

    @ApiProperty({
        required: false,
        example: faker.location.country(),
    })
    @IsOptional()
    @IsString()
    continent?: string;

    @ApiProperty({
        required: false,
        example: TimeZoneDto,
    })
    @IsOptional()
    @IsString()
    timeZone?: TimeZoneRegions[];

    @ApiProperty({
        required: false,
        example: faker.finance.currency(),
    })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiProperty({
        required: false,
        description: 'Top level domain',
        example: faker.internet.domainSuffix(),
    })
    @IsOptional()
    @IsArray()
    domain?: string;
}
