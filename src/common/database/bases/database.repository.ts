import {
    Model,
    PipelineStage,
    PopulateOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline,
} from 'mongoose';
import {
    IDatabaseAggregateOptions,
    IDatabaseCreateManyOptions,
    IDatabaseCreateOptions,
    IDatabaseDeleteManyOptions,
    IDatabaseDeleteOptions,
    IDatabaseDocument,
    IDatabaseFindAllAggregateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseOptions,
    IDatabaseSaveOptions,
    IDatabaseUpdateManyOptions,
    IDatabaseUpdateOptions,
} from 'src/common/database/interfaces/database.interface';
import MongoDB from 'mongodb';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/enums/pagination.enum';
import { DatabaseSoftDeleteDto } from 'src/common/database/dtos/database.soft-delete.dto';
import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';

export class DatabaseRepositoryBase<
    Entity extends DatabaseEntityBase,
    EntityDocument extends IDatabaseDocument<Entity>,
> {
    protected readonly _repository: Model<Entity>;
    readonly _join?: PopulateOptions | (string | PopulateOptions)[];

    constructor(
        repository: Model<Entity>,
        options?: PopulateOptions | (string | PopulateOptions)[]
    ) {
        this._repository = repository;
        this._join = options;
    }

    // Find
    async findAll<T = EntityDocument>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]> {
        const repository = this._repository.find<T>({
            ...find,
            deleted: options?.withDeleted ?? false,
        });

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.paging) {
            repository.limit(options.paging.limit).skip(options.paging.offset);
        }

        if (options?.order) {
            repository.sort(options.order);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async findSelect<T = EntityDocument>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T[]> {
        const repository = this._repository
            .find<T>({
                ...find,
                deleted: options?.withDeleted ?? false,
            })
            .select('_id start_time end_time plan_date'); // Select specific fields

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async findOne<T = EntityDocument>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const repository = this._repository.findOne<T>({
            ...find,
            deleted: options?.withDeleted ?? false,
        });

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.order) {
            repository.sort(options.order);
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async findOneById<T = EntityDocument>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const repository = this._repository.findOne<T>({
            _id,
            deleted: options?.withDeleted ?? false,
        });

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.order) {
            repository.sort(options.order);
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async findOneAndLock<T = EntityDocument>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const repository = this._repository.findOneAndUpdate<T>(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.order) {
            repository.sort(options.order);
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async findOneByIdAndLock<T = EntityDocument>(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const repository = this._repository.findOneAndUpdate<T>(
            {
                _id,
                deleted: options?.withDeleted ?? false,
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );

        if (options?.select) {
            repository.select(options.select);
        }

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.order) {
            repository.sort(options.order);
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository.exec();
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        const repository = this._repository.countDocuments({
            ...find,
            deleted: options?.withDeleted ?? false,
        });

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        return repository;
    }

    async exists(
        find: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<boolean> {
        const repository = this._repository.exists({
            ...find,
            deleted: options?.withDeleted ?? false,
        });

        if (options?.join) {
            repository.populate(
                (typeof options.join === 'boolean' && options.join
                    ? this._join
                    : options.join) as
                    | PopulateOptions
                    | (string | PopulateOptions)[]
            );
        }

        if (options?.session) {
            repository.session(options.session);
        }

        const result = await repository;
        return result ? true : false;
    }

    async create<T extends DatabaseEntityBase>(
        data: T,
        options?: IDatabaseCreateOptions
    ): Promise<EntityDocument> {
        const created = await this._repository.create([data], options);

        return created[0] as any;
    }

    // Action
    async update(
        find: Record<string, any>,
        data: UpdateQuery<EntityDocument> | UpdateWithAggregationPipeline,
        options?: IDatabaseUpdateOptions
    ): Promise<EntityDocument> {
        return this._repository.findOneAndUpdate(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            data,
            {
                ...options,
                new: true,
            }
        );
    }

    async delete(
        find: Record<string, any>,
        options?: IDatabaseDeleteOptions
    ): Promise<EntityDocument> {
        return this._repository.findOneAndDelete(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            {
                ...options,
                new: false,
            }
        );
    }

    async save(
        repository: EntityDocument,
        options?: IDatabaseSaveOptions
    ): Promise<EntityDocument> {
        return repository.save(options);
    }

    async join<T = any>(
        repository: EntityDocument,
        joins: PopulateOptions | (string | PopulateOptions)[]
    ): Promise<T> {
        return repository.populate(joins);
    }

    // Soft delete
    async softDelete(
        repository: EntityDocument,
        dto?: DatabaseSoftDeleteDto,
        options?: IDatabaseOptions
    ): Promise<EntityDocument> {
        repository.deletedAt = new Date();
        repository.deleted = true;
        repository.deletedBy = dto?.deletedBy;

        return repository.save(options);
    }

    async restore(
        repository: EntityDocument,
        options?: IDatabaseSaveOptions
    ): Promise<EntityDocument> {
        repository.deletedAt = undefined;
        repository.deleted = false;
        repository.deletedBy = undefined;

        return repository.save(options);
    }

    // Bulk
    async createMany<T extends Entity>(
        data: T[],
        options?: IDatabaseCreateManyOptions
    ): Promise<MongoDB.InsertManyResult> {
        return this._repository.insertMany(data, {
            ...options,
            rawResult: true,
        });
    }

    async updateMany<T = any>(
        find: Record<string, any>,
        data: T,
        options?: IDatabaseUpdateManyOptions
    ): Promise<MongoDB.UpdateResult> {
        return this._repository.updateMany(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            {
                $set: data,
            },
            { ...options, rawResult: true }
        );
    }

    async updateManyRaw(
        find: Record<string, any>,
        data: UpdateQuery<EntityDocument> | UpdateWithAggregationPipeline,
        options?: IDatabaseUpdateManyOptions
    ): Promise<MongoDB.UpdateResult> {
        return this._repository.updateMany(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            data,
            { ...options, rawResult: true }
        );
    }

    async deleteMany(
        find: Record<string, any>,
        options?: IDatabaseDeleteManyOptions
    ): Promise<MongoDB.DeleteResult> {
        return this._repository.deleteMany(
            {
                ...find,
                deleted: options?.withDeleted ?? false,
            },
            { ...options, rawResult: true }
        );
    }

    async softDeleteMany(
        find: Record<string, any>,
        dto?: DatabaseSoftDeleteDto,
        options?: IDatabaseOptions
    ): Promise<MongoDB.UpdateResult> {
        return this._repository.updateMany(
            {
                ...find,
                deleted: false,
            },
            {
                $set: {
                    deletedAt: new Date(),
                    deleted: true,
                    deletedBy: dto?.deletedBy,
                },
            },
            { ...options, rawResult: true }
        );
    }

    async restoreMany(
        find: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<MongoDB.UpdateResult> {
        return this._repository.updateMany(
            {
                ...find,
                deleted: true,
            },
            {
                $set: {
                    deletedAt: undefined,
                    deleted: false,
                    deletedBy: undefined,
                },
            },
            { ...options, rawResult: true }
        );
    }

    // Raw
    async aggregate<
        AggregatePipeline extends PipelineStage,
        AggregateResponse = any,
    >(
        pipelines: AggregatePipeline[],
        options?: IDatabaseAggregateOptions
    ): Promise<AggregateResponse[]> {
        if (!Array.isArray(pipelines)) {
            throw new Error('Must in array');
        }

        const newPipelines: PipelineStage[] = [
            {
                $match: {
                    deleted: options?.withDeleted ?? false,
                },
            },
            ...pipelines,
        ];

        const aggregate =
            this._repository.aggregate<AggregateResponse>(newPipelines);

        if (options?.session) {
            aggregate.session(options?.session);
        }

        return aggregate;
    }

    async findAllAggregate<
        AggregatePipeline extends PipelineStage,
        AggregateResponse = any,
    >(
        pipelines: AggregatePipeline[],
        options?: IDatabaseFindAllAggregateOptions
    ): Promise<AggregateResponse[]> {
        if (!Array.isArray(pipelines)) {
            throw new Error('Must in array');
        }

        const newPipelines: PipelineStage[] = [
            {
                $match: {
                    deleted: options?.withDeleted ?? false,
                },
            },
            ...pipelines,
        ];

        if (options?.order) {
            const keysOrder = Object.keys(options?.order);
            newPipelines.push({
                $sort: keysOrder.reduce(
                    (a, b) => ({
                        ...a,
                        [b]:
                            options?.order[b] ===
                            ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
                                ? 1
                                : -1,
                    }),
                    {}
                ),
            });
        }

        if (options?.paging) {
            newPipelines.push(
                {
                    $limit: options.paging.limit + options.paging.offset,
                },
                { $skip: options.paging.offset }
            );
        }

        const aggregate =
            this._repository.aggregate<AggregateResponse>(newPipelines);

        if (options?.session) {
            aggregate.session(options?.session);
        }

        return aggregate;
    }

    async getTotalAggregate<AggregatePipeline extends PipelineStage>(
        pipelines: AggregatePipeline[],
        options?: IDatabaseAggregateOptions
    ): Promise<number> {
        if (!Array.isArray(pipelines)) {
            throw new Error('Must in array');
        }

        const newPipelines: PipelineStage[] = [
            {
                $match: {
                    deleted: options?.withDeleted ?? false,
                },
            },
            ...pipelines,
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ];

        const aggregate = this._repository.aggregate(newPipelines);

        if (options?.session) {
            aggregate.session(options?.session);
        }

        const raw = await aggregate;
        return raw && raw.length > 0 ? raw[0].count : 0;
    }

    async model(): Promise<Model<Entity>> {
        return this._repository;
    }

    async getDailyStatisticsCaptains(
        user: string,
        planDate: string,
        options?: IDatabaseAggregateOptions
    ): Promise<{ averageRating: number; averageCompletion: number }> {
        // Normalize the date to start of the day
        const startOfDay = new Date(planDate);
        startOfDay.setHours(0, 0, 0, 0);

        // End of the day
        const endOfDay = new Date(planDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Aggregate data for the specific user
        const result = await this._repository.aggregate([
            {
                $match: {
                    user, // Filter by user
                    plan_date: { $gte: startOfDay, $lte: endOfDay },
                    rating: { $exists: true },
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    averageCompletion: { $avg: '$completion_percentage' },
                },
            },
        ]);

        // Return the results
        if (result.length > 0) {
            return {
                averageRating: result[0].averageRating || 0,
                averageCompletion: result[0].averageCompletion || 0,
            };
        }

        // Default to 0 if no data exists
        return { averageRating: 0, averageCompletion: 0 };
    }

    async getDailyStatistics(
        user: string,
        planDate: Date,
        options?: IDatabaseAggregateOptions
    ): Promise<any> {
        const normalizedDate = new Date(planDate);
        normalizedDate.setHours(0, 0, 0, 0);

        const endNormalizedDateOfDay = new Date(planDate);
        endNormalizedDateOfDay.setHours(23, 59, 59, 999);

        const pipelines: PipelineStage[] = [
            {
                $match: {
                    user,
                    plan_date: {
                        $gte: normalizedDate,
                        $lte: endNormalizedDateOfDay,
                    },
                    rating: { $exists: true },
                },
            },
            {
                $group: {
                    _id: '$plan_date',
                    dailyAverageCompletion: { $avg: '$completion_percentage' },
                    dailyAverageRating: { $avg: '$rating' },
                    totalPlans: { $sum: 1 },
                    ratings: { $push: '$rating' }, // Collect all ratings
                    completions: { $push: '$completion_percentage' }, // Collect all completion percentages
                },
            },
            {
                $project: {
                    _id: 0, // Exclude the group ID from the output
                    planDate: '$_id',
                    dailyAverageCompletion: 1,
                    dailyAverageRating: 1,
                    totalPlans: 1,
                    ratings: 1,
                    completions: 1,
                },
            },
        ];

        const repository: Model<Entity> = await this.model();
        return repository.aggregate(pipelines);
    }

    async getWeeklyStatistics(
        user: string,
        startDate: Date,
        endDate: Date,
        options?: IDatabaseAggregateOptions
    ): Promise<any> {
        const normalizedStartDate = new Date(startDate);
        normalizedStartDate.setHours(0, 0, 0, 0);

        const normalizedEndDate = new Date(endDate);
        normalizedEndDate.setHours(23, 59, 59, 999);

        const pipelines: PipelineStage[] = [
            {
                $match: {
                    user,
                    plan_date: {
                        $gte: normalizedStartDate,
                        $lte: normalizedEndDate,
                    },
                },
            },
            {
                $group: {
                    _id: { $week: '$plan_date' },
                    dailyData: {
                        $push: {
                            date: '$plan_date',
                            averageCompletion: {
                                $avg: '$completion_percentage',
                            },
                            averageRating: { $avg: '$rating' },
                            count: { $sum: 1 },
                        },
                    },
                    weeklyAverageCompletion: { $avg: '$completion_percentage' },
                    weeklyAverageRating: { $avg: '$rating' },
                    totalPlans: { $sum: 1 },
                },
            },
        ];

        const repository: Model<Entity> = await this.model();
        return repository.aggregate(pipelines);
    }

    async getMonthlyStatistics(
        user: string,
        year: number,
        month: number,
        options?: IDatabaseAggregateOptions
    ): Promise<any[]> {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);

        startOfMonth.setHours(0, 0, 0, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const pipelines: PipelineStage[] = [
            {
                $match: {
                    user,
                    plan_date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$plan_date' },
                    dailyData: {
                        $push: {
                            date: '$plan_date',
                            averageCompletion: {
                                $avg: '$completion_percentage',
                            },
                            averageRating: { $avg: '$rating' },
                            count: { $sum: 1 },
                        },
                    },
                    monthlyAverageCompletion: {
                        $avg: '$completion_percentage',
                    },
                    monthlyAverageRating: { $avg: '$rating' },
                    totalPlans: { $sum: 1 },
                },
            },
        ];

        const repository: Model<Entity> = await this.model();
        return repository.aggregate(pipelines);
    }

    async getYearlyStatistics(
        user: string,
        year: number,
        options?: IDatabaseAggregateOptions
    ): Promise<any[]> {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);

        startOfYear.setHours(0, 0, 0, 0);
        endOfYear.setHours(23, 59, 59, 999);

        const pipelines: PipelineStage[] = [
            {
                $match: {
                    user,
                    plan_date: {
                        $gte: startOfYear,
                        $lte: endOfYear,
                    },
                },
            },
            {
                $group: {
                    _id: { $year: '$plan_date' },
                    monthlyData: {
                        $push: {
                            month: { $month: '$plan_date' },
                            averageCompletion: {
                                $avg: '$completion_percentage',
                            },
                            averageRating: { $avg: '$rating' },
                            count: { $sum: 1 },
                        },
                    },
                    yearlyAverageCompletion: { $avg: '$completion_percentage' },
                    yearlyAverageRating: { $avg: '$rating' },
                    totalPlans: { $sum: 1 },
                },
            },
        ];

        const repository: Model<Entity> = await this.model();
        return repository.aggregate(pipelines);
    }
}
