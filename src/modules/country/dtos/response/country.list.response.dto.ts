import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { DatabaseDto } from 'src/common/database/dtos/database.dto';
import {
    GeoCountriesEntitiesDto,
    StatesCountriesDto,
    TimeZoneDto,
} from '../../docs/country.swagger.doc';

export class CountryListResponseDto extends DatabaseDto {
    @ApiProperty({
        required: true,
        description: 'Country name',
        example: faker.location.country(),
        maxLength: 100,
        minLength: 1,
    })
    name: string;

    @ApiProperty({
        required: false,
        description: 'Country code, Alpha 2 code version',
        example: faker.location.countryCode('alpha-2'),
        maxLength: 2,
        minLength: 2,
    })
    alpha2Code: string;

    @ApiProperty({
        required: false,
        description: 'Country code, Alpha 3 code version',
        example: faker.location.countryCode('alpha-3'),
        maxLength: 3,
        minLength: 3,
    })
    alpha3Code: string;

    @ApiProperty({
        required: false,
        description: 'Country code, Numeric code version',
        example: faker.location.countryCode('numeric'),
        maxLength: 3,
        minLength: 3,
    })
    numericCode: string;

    @ApiProperty({
        required: false,
        description: 'Country code, FIPS version',
        example: faker.location.countryCode('alpha-2'),
        maxLength: 2,
        minLength: 2,
    })
    fipsCode: string;

    @ApiProperty({
        required: false,
        description: 'Country phone code',
        example: [faker.helpers.arrayElement(['62', '65'])],
        maxLength: 4,
        minLength: 4,
        isArray: true,
    })
    phoneCode: string[];

    @ApiProperty({
        required: false,
        example: faker.location.country(),
    })
    continent: string;

    @ApiProperty({
        required: false,
        example: faker.finance.currencyCode(),
    })
    currency: string;

    @ApiProperty({
        required: false,
        description: 'Top level domain',
        example: faker.internet.domainSuffix(),
    })
    domain?: string;

    @ApiProperty({
        required: false,
        description: 'Country code',
        example: 'US',
    })
    countryCode?: string;

    @ApiProperty({
        required: false,
        description:
            'Distance unit used in the country (e.g., kilometers, miles)',
        example: 'miles',
    })
    distanceUnit?: string;

    @ApiProperty({
        required: false,
        description: 'Indicates if the country is a G7 member',
        example: true,
    })
    g7Member?: boolean;

    @ApiProperty({
        required: false,
        description: 'Indicates if the country is a G20 member',
        example: true,
    })
    g20Member?: boolean;

    @ApiProperty({
        required: false,
        description: 'Geopolitical entity code',
        example: 'US',
    })
    gec?: string;

    @ApiProperty({
        required: false,
        description: 'International prefix for phone numbers',
        example: '+1',
    })
    international_prefix?: string;

    @ApiProperty({
        required: false,
        description: 'IOC code (International Olympic Committee)',
        example: 'USA',
    })
    ioc?: string;

    @ApiProperty({
        required: false,
        description: 'ISO long name of the country',
        example: 'United States of America',
    })
    iso_long_name?: string;

    @ApiProperty({
        required: false,
        description: 'ISO short name of the country',
        example: 'United States',
    })
    iso_short_name?: string;

    @ApiProperty({
        required: false,
        description: 'Official languages spoken in the country',
        type: [String],
        example: ['English'],
    })
    languages_official?: string[];

    @ApiProperty({
        required: false,
        description: 'Languages commonly spoken in the country',
        type: [String],
        example: ['English', 'Spanish'],
    })
    languages_spoken?: string[];

    @ApiProperty({
        required: false,
        description: 'Lengths of national destination codes',
        type: [String],
        example: ['3', '4'],
    })
    national_destination_code_lengths?: string[];

    @ApiProperty({
        required: false,
        description: 'Lengths of national phone numbers',
        type: [String],
        example: ['10'],
    })
    national_number_lengths?: string[];

    @ApiProperty({
        required: false,
        description: 'National phone prefix',
        example: '1',
    })
    national_prefix?: string;

    @ApiProperty({
        required: false,
        description: 'Nationality of citizens',
        example: 'American',
    })
    nationality?: string;

    @ApiProperty({
        required: false,
        description: 'National number format',
        example: '+1 123-456-7890',
    })
    number?: string;

    @ApiProperty({
        required: false,
        description: 'Indicates if the country uses postal codes',
        example: true,
    })
    postal_code?: boolean;

    @ApiProperty({
        required: false,
        description: 'Format of postal codes in the country',
        example: '#####',
    })
    postal_code_format?: string;

    @ApiProperty({
        required: false,
        description: 'Region of the country',
        example: 'Americas',
    })
    region?: string;

    @ApiProperty({
        required: false,
        description: 'Day considered the start of the week',
        example: 'Sunday',
    })
    start_of_week?: string;

    @ApiProperty({
        required: false,
        description: 'Subregion of the country',
        example: 'Northern America',
    })
    subregion?: string;

    @ApiProperty({
        required: false,
        description: 'UN LOCODE',
        example: 'US',
    })
    un_locode?: string;

    @ApiProperty({
        required: false,
        description: 'Country emoji',
        example: '🇺🇸',
    })
    emoji?: string;

    @ApiProperty({
        required: false,
        description: 'Unofficial names of the country',
        type: [String],
        example: ['USA', 'America'],
    })
    unofficial_names?: string[];

    @ApiProperty({
        required: false,
        description: 'Capital city of the country',
        example: 'Washington, D.C.',
    })
    capital?: string;

    @ApiProperty({
        required: false,
        description: 'Currency name',
        example: 'United States Dollar',
    })
    currency_name?: string;

    @ApiProperty({
        required: false,
        description: 'Currency symbol',
        example: '$',
    })
    currency_symbol?: string;

    @ApiProperty({
        required: false,
        description: 'Native name of the country',
        example: 'United States',
    })
    native?: string;

    @ApiProperty({
        required: false,
        description: 'Subregions of the country',
        example: 'Northern America',
    })
    subregions?: string;

    @ApiProperty({
        required: false,
        description: 'National characteristics of the country',
        example: 'United States',
    })
    national?: string;

    @ApiProperty({
        required: false,
        description: 'Emoji Unicode representation',
        example: 'U+1F1FA U+1F1F8',
    })
    emojiU?: string;

    @ApiProperty({
        required: false,
        description: 'An array of timezones associated with the country',
        type: [TimeZoneDto],
    })
    timeZone: TimeZoneDto[];

    @ApiProperty({
        required: false,
        description: 'States of the country',
        type: [StatesCountriesDto],
    })
    state?: StatesCountriesDto[];

    @ApiProperty({
        required: false,
        description: 'Geographical data of the country',
        type: GeoCountriesEntitiesDto,
    })
    geo?: GeoCountriesEntitiesDto;

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

    @ApiHideProperty()
    @Exclude()
    deletedAt?: Date;
}
