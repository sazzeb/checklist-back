import { IHelperDateService } from '../interfaces/helper.date-service.interface';

export function HelperTimeConvertService(input: string): any {
    const timeRegex = /^(\d+)([dmy])$/; // Regex to match numbers followed by a unit (d, m, or y)
    const match = input.match(timeRegex);

    if (!match) {
        return "Invalid input format. Use a number followed by 'd' (days), 'm' (months), or 'y' (years).";
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const SECONDS_IN_A_DAY = 86400;
    const SECONDS_IN_A_MONTH = 2629800; // Average month (30.44 days)
    const SECONDS_IN_A_YEAR = 31557600; // Average year (365.25 days)

    switch (unit) {
        case 'd':
            return value * SECONDS_IN_A_DAY;
        case 'm':
            return value * SECONDS_IN_A_MONTH;
        case 'y':
            return value * SECONDS_IN_A_YEAR;
        default:
            return "Invalid unit. Use 'd' for days, 'm' for months, or 'y' for years.";
    }
}
