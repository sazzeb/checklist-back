import { DatabaseProp } from '../../../../common/database/decorators/database.decorator';

export class Coordinates {
    @DatabaseProp({ optional: true, type: Number })
    lat?: number;

    @DatabaseProp({ optional: true, type: Number })
    lng?: number;
}

export class GeoBounds {
    @DatabaseProp({ optional: true, type: Coordinates })
    northeast?: Coordinates;

    @DatabaseProp({ optional: true, type: Coordinates })
    southwest?: Coordinates;
}

export class GeoCountriesEntities {
    @DatabaseProp({ optional: true })
    latitude?: number;

    @DatabaseProp({ optional: true })
    longitude?: number;

    @DatabaseProp({ optional: true })
    max_latitude?: number;

    @DatabaseProp({ optional: true })
    max_longitude?: number;

    @DatabaseProp({ optional: true })
    min_latitude?: number;

    @DatabaseProp({ optional: true })
    min_longitude?: number;

    @DatabaseProp({ optional: true, type: GeoBounds })
    bounds?: GeoBounds;
}

export type TimeZoneRegions = {
    zoneName?: string;
    gmtOffset?: number;
    gmtOffsetName?: string;
    abbreviation: string;
    tzName?: string;
};

export type City = {
    id?: number;
    name?: string;
    latitude?: string;
    longitude?: string;
};

export type StatesCountries = {
    id?: number;
    name?: string;
    state_code?: string;
    latitude?: string;
    longitude?: string;
    type?: string | null;
    cities?: City[];
};
