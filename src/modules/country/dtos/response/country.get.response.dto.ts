import { Expose, Type } from 'class-transformer';

export class CountryImageDto {
    @Expose()
    baseUrl: string;

    @Expose()
    bucket: string;

    @Expose()
    completedUrl: string;

    @Expose()
    filename: string;

    @Expose()
    mime: string;

    @Expose()
    path: string;

    @Expose()
    pathWithFilename: string;

    @Expose()
    size: number;

    @Expose()
    duration: number;
}

export class CountryGetResponseDto {
    @Expose()
    _id: string;

    @Expose()
    name: string;

    @Expose()
    alpha2Code: string;

    @Expose()
    alpha3Code: string;

    @Expose()
    domain: string;

    @Expose()
    fipsCode: string;

    @Expose()
    numericCode: string;

    @Expose()
    phoneCode: string[];

    @Expose()
    continent: string;

    @Expose()
    timeZone: string;

    @Expose()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @Type(() => Date)
    updatedAt: Date;

    @Expose()
    @Type(() => CountryImageDto)
    image?: CountryImageDto;
}
