import { applyDecorators } from '@nestjs/common';
import {
    DocAuth,
    DocResponsePaging,
} from 'src/common/doc/decorators/doc.decorator';
import { Doc } from 'src/common/doc/decorators/doc.decorator';
import { CountryListResponseDto } from 'src/modules/country/dtos/response/country.list.response.dto';

export function CountrySystemGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'Fetch country informations' }),
        DocAuth({ xApiKey: true }),
        DocResponsePaging<CountryListResponseDto>('country.index', {
            dto: CountryListResponseDto,
        })
    );
}

export function CountrySystemListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ summary: 'get all list country' }),
        DocAuth({ xApiKey: true }),
        DocResponsePaging<CountryListResponseDto>('country.list', {
            dto: CountryListResponseDto,
        })
    );
}
