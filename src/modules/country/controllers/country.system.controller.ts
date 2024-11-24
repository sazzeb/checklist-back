import {
    BadRequestException,
    Controller,
    Get,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeySystemProtected } from 'src/modules/api-key/decorators/api-key.decorator';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
    Response,
    ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { COUNTRY_DEFAULT_AVAILABLE_SEARCH } from 'src/modules/country/constants/country.list.constant';
import { CountryDoc } from 'src/modules/country/repository/entities/country.entity';
import { CountryService } from 'src/modules/country/services/country.service';
import {
    CountrySystemGetDoc,
    CountrySystemListDoc,
} from 'src/modules/country/docs/country.system.doc';
import { CountryListResponseDto } from 'src/modules/country/dtos/response/country.list.response.dto';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../../auth/enums/auth.status-code.enum';

@ApiTags('modules.system.country')
@Controller({
    version: '1',
    path: '/country',
})
export class CountrySystemController {
    constructor(
        private readonly countryService: CountryService,
        private readonly paginationService: PaginationService
    ) {}

    @CountrySystemListDoc()
    @ResponsePaging('country.list')
    @ApiKeySystemProtected()
    @Get('/list')
    async list(
        @PaginationQuery({
            availableSearch: COUNTRY_DEFAULT_AVAILABLE_SEARCH,
        })
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<CountryListResponseDto>> {
        const find: Record<string, any> = {
            ..._search,
        };

        const countries: CountryDoc[] = await this.countryService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );
        const total: number = await this.countryService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        const mapped: CountryListResponseDto[] =
            await this.countryService.mapList(countries);

        return {
            _pagination: { total, totalPage },
            data: mapped,
        };
    }

    @CountrySystemGetDoc()
    @Response('country.index')
    @ApiKeySystemProtected()
    @Get('/get')
    async index(): Promise<IResponse<boolean>> {
        try {
            const data = await this.countryService.generateCreateMany();
            return {
                data: data,
            };
        } catch (err) {
            throw new BadRequestException({
                statusCode: ENUM_AUTH_STATUS_CODE_ERROR.SOCIAL_GOOGLE,
                message: 'country.error.countries',
                _error: `The  error message is ${err}`,
            });
        }
    }
}
