import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';
import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import {
    GeoCountriesEntities,
    StatesCountries,
    TimeZoneRegions,
} from './countries.objects';

export const CountryTableName = 'Countries';

@DatabaseEntity({ collection: CountryTableName })
export class CountryEntity extends DatabaseEntityBase {
    @DatabaseProp({
        required: true,
        index: true,
        maxlength: 100,
    })
    name: string;

    @DatabaseProp({
        optional: true,
        index: true,
        unique: true,
        trim: true,
        maxlength: 2,
        minlength: 2,
        uppercase: true,
    })
    alpha2Code?: string;

    @DatabaseProp({
        optional: true,
        index: true,
        unique: true,
        trim: true,
        maxlength: 3,
        minlength: 3,
        uppercase: true,
    })
    alpha3Code?: string;

    @DatabaseProp({
        optional: true,
        unique: true,
        trim: true,
        maxlength: 3,
        minlength: 1,
    })
    numericCode?: string;

    @DatabaseProp({
        optional: true,
        unique: true,
        trim: true,
        maxlength: 2,
        minlength: 2,
        uppercase: true,
    })
    fipsCode?: string;

    @DatabaseProp({
        optional: true,
        index: true,
        type: [{ type: String, index: true, unique: true, trim: true }],
        maxlength: 4,
    })
    phoneCode?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    continent?: string;

    @DatabaseProp({
        optional: true,
    })
    currency?: string;

    @DatabaseProp({
        optional: true,
    })
    domain?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    countryCode?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    distanceUnit?: string;

    @DatabaseProp({
        optional: true,
        type: Boolean,
    })
    g7Member?: boolean;

    @DatabaseProp({
        optional: true,
        type: Boolean,
    })
    g20Member?: boolean;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    gec?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    international_prefix?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    ioc?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    iso_long_name?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    iso_short_name?: string;

    @DatabaseProp({
        optional: true,
        type: [{ type: String, trim: true }],
    })
    languages_official?: string[];

    @DatabaseProp({
        optional: true,
        type: [{ type: String, trim: true }],
    })
    languages_spoken?: string[];

    @DatabaseProp({
        optional: true,
        type: [{ type: String, trim: true }],
    })
    national_destination_code_lengths?: string[];

    @DatabaseProp({
        optional: true,
        type: [{ type: String, trim: true }],
    })
    national_number_lengths?: string[];

    @DatabaseProp({
        optional: true,
        type: String,
    })
    national_prefix?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    nationality?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    number?: string;

    @DatabaseProp({
        optional: true,
        type: Boolean,
    })
    postal_code?: boolean;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    postal_code_format?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    region?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    start_of_week?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    subregion?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    un_locode?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    emoji?: string;

    @DatabaseProp({
        optional: true,
    })
    unofficial_names?: string[];

    @DatabaseProp({
        optional: true,
        type: String,
    })
    world_region?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    capital?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    currency_name?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    currency_symbol?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    native?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    subregions?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    national?: string;

    @DatabaseProp({
        optional: true,
        type: String,
    })
    emojiU?: string;

    @DatabaseProp({
        optional: true,
        type: [{ type: Object, trim: true, optional: true }],
    })
    state?: StatesCountries[];

    @DatabaseProp({
        optional: true,
        type: [{ type: Object, trim: true, optional: true }],
    })
    timeZone?: TimeZoneRegions[];

    @DatabaseProp({
        optional: true,
        type: GeoCountriesEntities,
    })
    geo?: GeoCountriesEntities;
}

export const CountrySchema = DatabaseSchema(CountryEntity);
export type CountryDoc = IDatabaseDocument<CountryEntity>;
