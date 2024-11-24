interface GeoBounds {
    northeast: {
        lat?: number;
        lng: number;
    };
    southwest: {
        lat?: number;
        lng?: number;
    };
}

interface Geo {
    latitude?: number;
    longitude?: number;
    max_latitude?: number;
    max_longitude?: number;
    min_latitude?: number;
    min_longitude?: number;
    bounds: GeoBounds;
}

export interface CountryJsonDataDetails {
    alpha2?: string;
    alpha3?: string;
    continent?: string;
    country_code?: string;
    currency_code?: string;
    distance_unit?: string;
    gec?: string;
    geo?: Geo;
    international_prefix?: string;
    ioc?: string;
    iso_long_name?: string;
    iso_short_name?: string;
    languages_official?: string[];
    languages_spoken?: string[];
    national_destination_code_lengths?: any[];
    national_number_lengths?: number[];
    national_prefix?: string;
    nationality?: string;
    number?: string;
    g7_member?: boolean;
    g20_member?: boolean;
    postal_code?: boolean;
    postal_code_format?: string;
    region?: string;
    start_of_week?: string;
    subregion: string;
    un_locode?: string;
    unofficial_names?: string[];
    world_region?: string;
}
