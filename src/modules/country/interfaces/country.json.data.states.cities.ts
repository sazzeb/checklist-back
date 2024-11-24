interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

interface Translation {
    [key: string]: string;
}

interface City {
    id?: number;
    name?: string;
    latitude?: string;
    longitude?: string;
}

interface State {
    id?: number;
    name?: string;
    state_code?: string;
    latitude?: string;
    longitude?: string;
    type?: string | null;
    cities?: City[];
}

interface CountryJsonDataStatesCities {
    id?: number;
    name?: string;
    iso3?: string;
    iso2?: string;
    numeric_code?: string;
    phone_code?: string;
    capital?: string;
    currency?: string;
    currency_name?: string;
    currency_symbol?: string;
    tld?: string;
    native?: string;
    region?: string;
    region_id?: number;
    subregion?: string;
    subregion_id?: number;
    nationality?: string;
    timezones?: Timezone[];
    translations?: Translation;
    latitude?: string;
    longitude?: string;
    emoji?: string;
    emojiU?: string;
    states?: State[];
}
