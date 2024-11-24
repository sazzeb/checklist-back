import { ApiProperty } from '@nestjs/swagger';

export class GeoBoundsDto {
    @ApiProperty({
        required: false,
        description: 'Northeastern boundary latitude',
        example: 71.3577635769,
    })
    northeast?: {
        lat?: number;
        lng?: number;
    };

    @ApiProperty({
        required: false,
        description: 'Southwestern boundary latitude',
        example: 18.91619,
    })
    southwest?: {
        lat?: number;
        lng?: number;
    };
}

export class CityDto {
    @ApiProperty({
        required: false,
        description: 'City ID',
        example: 76,
    })
    id?: number;

    @ApiProperty({
        required: false,
        description: 'City name',
        example: 'Badakhshan',
    })
    name?: string;

    @ApiProperty({
        required: false,
        description: 'City latitude',
        example: '56.73477250',
    })
    latitude?: string;

    @ApiProperty({
        required: false,
        description: 'City longitude',
        example: '53.5678900',
    })
    longitude?: string;
}

export class StatesCountriesDto {
    @ApiProperty({
        required: false,
        description: 'State ID',
        example: 3901,
    })
    id?: number;

    @ApiProperty({
        required: false,
        description: 'State name',
        example: 'Badakhshan',
    })
    name?: string;

    @ApiProperty({
        required: false,
        description: 'State code',
        example: 'BDS',
    })
    state_code?: string;

    @ApiProperty({
        required: false,
        description: 'State latitude',
        example: '56.73477250',
    })
    latitude?: string;

    @ApiProperty({
        required: false,
        description: 'State longitude',
        example: '53.5678900',
    })
    longitude?: string;

    @ApiProperty({
        required: false,
        description: 'State type (nullable)',
        example: null,
    })
    type?: string | null;

    @ApiProperty({
        required: false,
        description: 'Cities within the state',
        type: [CityDto],
    })
    cities?: CityDto[];
}

export class TimeZoneDto {
    @ApiProperty({
        required: false,
        description: 'The name of the timezone zone',
        example: 'Asia/Kabul',
    })
    zoneName?: string;

    @ApiProperty({
        required: false,
        description: 'The GMT offset in seconds',
        example: 16200,
    })
    gmtOffset?: number;

    @ApiProperty({
        required: false,
        description: 'The GMT offset name',
        example: 'UTC+04:30',
    })
    gmtOffsetName?: string;

    @ApiProperty({
        required: true,
        description: 'The abbreviation of the timezone',
        example: 'AFT',
    })
    abbreviation: string;

    @ApiProperty({
        required: false,
        description: 'The name of the timezone',
        example: 'Afghanistan Time',
    })
    tzName?: string;
}

export class GeoCountriesEntitiesDto {
    @ApiProperty({
        required: false,
        description: 'Latitude of the country',
        example: 37.09024,
    })
    latitude?: number;

    @ApiProperty({
        required: false,
        description: 'Longitude of the country',
        example: -95.712891,
    })
    longitude?: number;

    @ApiProperty({
        required: false,
        description: 'Maximum latitude of the country',
        example: 71.3577635769,
    })
    max_latitude?: number;

    @ApiProperty({
        required: false,
        description: 'Maximum longitude of the country',
        example: -66.96466,
    })
    max_longitude?: number;

    @ApiProperty({
        required: false,
        description: 'Minimum latitude of the country',
        example: 18.91619,
    })
    min_latitude?: number;

    @ApiProperty({
        required: false,
        description: 'Minimum longitude of the country',
        example: -171.791110603,
    })
    min_longitude?: number;

    @ApiProperty({
        required: false,
        description: 'Geographical boundary of the country',
        type: GeoBoundsDto,
    })
    bounds?: GeoBoundsDto;
}
