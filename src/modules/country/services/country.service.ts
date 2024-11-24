import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';
import * as fs from 'fs';
import { join } from 'path';
import { DatabaseHelperQueryContain } from 'src/common/database/decorators/database.decorator';
import {
    IDatabaseCreateManyOptions,
    IDatabaseDeleteManyOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { CountryCreateRequestDto } from 'src/modules/country/dtos/request/country.create.request.dto';
import { CountryListResponseDto } from 'src/modules/country/dtos/response/country.list.response.dto';
import { CountryShortResponseDto } from 'src/modules/country/dtos/response/country.short.response.dto';
import { ICountryService } from 'src/modules/country/interfaces/country.service.interface';
import {
    CountryDoc,
    CountryEntity,
} from 'src/modules/country/repository/entities/country.entity';
import { CountryRepository } from 'src/modules/country/repository/repositories/country.repository';
import { CountryGetResponseDto } from '../dtos/response/country.get.response.dto';
import { CountryJsonDataDetails } from '../interfaces/country.json.data.details';

@Injectable()
export class CountryService implements ICountryService {
    constructor(private readonly countryRepository: CountryRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CountryDoc[]> {
        return this.countryRepository.findAll(find, options);
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne(find, options);
    }

    async findOneByName(
        name: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne(
            DatabaseHelperQueryContain('name', name),
            options
        );
    }

    async findOneByAlpha2(
        alpha2: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne(
            DatabaseHelperQueryContain('alpha2Code', alpha2),
            options
        );
    }

    async findOneByPhoneCode(
        phoneCode: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne(
            {
                phoneCode,
            },
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOneById(_id, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.countryRepository.getTotal(find, options);
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseDeleteManyOptions
    ): Promise<boolean> {
        await this.countryRepository.deleteMany(find, options);

        return true;
    }

    async createMany(
        data: CountryCreateRequestDto[],
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean> {
        const entities: CountryEntity[] = data.map(
            ({
                name,
                alpha2Code,
                alpha3Code,
                numericCode,
                continent,
                fipsCode,
                phoneCode,
                timeZone,
                domain,
                currency,
            }): CountryEntity => {
                const create: CountryEntity = new CountryEntity();
                create.name = name;
                create.alpha2Code = alpha2Code;
                create.alpha3Code = alpha3Code;
                create.numericCode = numericCode;
                create.continent = continent;
                create.fipsCode = fipsCode;
                create.phoneCode = phoneCode;
                create.timeZone = timeZone;
                create.domain = domain;
                create.currency = currency;

                return create;
            }
        ) as unknown as CountryEntity[];

        await this.countryRepository.createMany(entities, options);

        return true;
    }

    async generateCountriesJson(): Promise<CountryEntity[]> {
        try {
            const filePath = join(
                __dirname,
                '../../../assets/country/countries.json'
            );

            const countryExtendedPath = join(
                __dirname,
                '../../../assets/country/countries_states_cities.json'
            );

            const countriesData = JSON.parse(
                fs.readFileSync(filePath, 'utf-8')
            );

            const countryExtendedData = JSON.parse(
                fs.readFileSync(countryExtendedPath, 'utf-8')
            );

            const entities: CountryEntity[] = [];

            Object.keys(countriesData).forEach(countryCode => {
                const countryFilePath = join(
                    __dirname,
                    `../../../assets/country/countries/${countryCode}.json`
                );

                if (fs.existsSync(countryFilePath)) {
                    const countryDetail = JSON.parse(
                        fs.readFileSync(countryFilePath, 'utf-8')
                    );

                    const extendedDetails = countryExtendedData.find(
                        (item: { iso2: string }) => item.iso2 === countryCode
                    );

                    if (extendedDetails) {
                        entities.push({
                            name: countriesData[countryCode],
                            alpha2Code: countryCode,
                            alpha3Code: extendedDetails.iso3,
                            numericCode: extendedDetails.numeric_code,
                            fipsCode: countryCode,
                            phoneCode: extendedDetails.phone_code,
                            domain: extendedDetails.tld,
                            currency: extendedDetails.currency,
                            continent: countryDetail.continent,
                            countryCode: countryDetail.country_code,
                            currency_name: extendedDetails.currency_name,
                            currency_symbol: extendedDetails.currency_symbol,
                            distanceUnit: countryDetail.distance_unit,
                            gec: countryDetail.gec,
                            g7Member: countryDetail.g7_member,
                            g20Member: countryDetail.g20_member,
                            international_prefix:
                                countryDetail.international_prefix,
                            ioc: countryDetail.ioc,
                            iso_long_name: countryDetail.iso_long_name,
                            iso_short_name: countryDetail.iso_short_name,
                            languages_official:
                                countryDetail.languages_official,
                            languages_spoken: countryDetail.languages_spoken,
                            national_destination_code_lengths:
                                countryDetail.national_destination_code_lengths,
                            national_number_lengths:
                                countryDetail.national_number_lengths,
                            national_prefix: countryDetail.national_prefix,
                            nationality: countryDetail.nationality,
                            number: countryDetail.number,
                            postal_code: countryDetail.postal_code,
                            postal_code_format:
                                countryDetail.postal_code_format,
                            region: countryDetail.region,
                            start_of_week: countryDetail.start_of_week,
                            subregion: countryDetail.subregion,
                            un_locode: countryDetail.un_locode,
                            emoji: extendedDetails.emoji,
                            emojiU: extendedDetails.emojiU,
                            unofficial_names: countryDetail.unofficial_names,
                            capital: extendedDetails.capital,
                            world_region: countryDetail.world_region,
                            native: extendedDetails.native,
                            national: extendedDetails.nationality,
                            subregions: extendedDetails.subregion,
                            geo: countryDetail.geo,
                            timeZone: extendedDetails.timezones,
                            state: extendedDetails.states,
                        } as CountryEntity);
                    }
                } else {
                    console.warn(
                        `Warning: File not found for country code ${countryCode}`
                    );
                }
            });

            return entities;
        } catch (err) {
            console.error('Error generating country JSON:', err);
            return [];
        }
    }

    async generateCreateMany(
        options?: IDatabaseCreateManyOptions
    ): Promise<boolean> {
        try {
            // Generate country data from JSON
            const countryEntities: CountryEntity[] =
                await this.generateCountriesJson();

            // Check if data is available before attempting to create
            if (!countryEntities || countryEntities.length === 0) {
                console.warn('No countries were generated for createMany.');
                return false;
            }

            // Save the data to the repository
            await this.countryRepository.createMany(countryEntities, options);
            return true;
        } catch (err) {
            console.error('Error during generateCreateMany:', err);
            return false;
        }
    }

    async mapList(
        countries: CountryDoc[] | CountryEntity[]
    ): Promise<CountryListResponseDto[]> {
        return plainToInstance(
            CountryListResponseDto,
            countries.map((e: CountryDoc | CountryEntity) =>
                e instanceof Document ? e.toObject() : e
            )
        );
    }

    async findOneActiveByPhoneCode(
        phoneCode: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne(
            {
                phoneCode,
                isActive: true,
            },
            options
        );
    }

    async findOneActiveById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CountryDoc> {
        return this.countryRepository.findOne({ _id, isActive: true }, options);
    }

    async mapShort(
        countries: CountryDoc[] | CountryEntity[]
    ): Promise<CountryShortResponseDto[]> {
        return plainToInstance(
            CountryShortResponseDto,
            countries.map((e: CountryDoc | CountryEntity) =>
                e instanceof Document ? e.toObject() : e
            )
        );
    }

    async mapGet(
        country: CountryDoc | CountryEntity
    ): Promise<CountryGetResponseDto> {
        return plainToInstance(
            CountryGetResponseDto,
            country instanceof Document ? country.toObject() : country
        );
    }
}
