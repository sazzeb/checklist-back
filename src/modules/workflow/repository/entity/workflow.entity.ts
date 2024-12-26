import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';
import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from 'class-validator';

export const WorkFlowTableName = 'workflow';

@DatabaseEntity({ collection: WorkFlowTableName })
export class WorkFlowEntity extends DatabaseEntityBase {
    @DatabaseProp({
        required: true,
        index: true,
        maxlength: 250,
    })
    plan: string;

    @ApiProperty({
        required: true,
        description: 'Plan date must be today or a future date.',
        example: new Date().toISOString(),
    })
    @IsNotEmpty({ message: 'Plan date must not be empty' })
    @DatabaseProp({
        type: Date,
        required: true,
        index: true,
        validate: {
            validator: function (value: Date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize to midnight
                const planDate = new Date(value);
                planDate.setHours(0, 0, 0, 0); // Normalize to midnight
                return planDate >= today;
            },
            message: 'Plan date must be today or a future date.',
        },
    })
    plan_date: Date;

    @ApiProperty({
        required: true,
        description: 'Start date and time for the plan.',
        example: new Date().toISOString(),
    })
    @IsNotEmpty({ message: 'Start time must not be empty' })
    @IsDate({ message: 'Start time must be a valid date and time.' })
    @DatabaseProp({
        type: Date,
        required: true,
        index: true,
    })
    start_time: Date;

    @ApiProperty({
        required: true,
        description: 'End date and time for the plan.',
        example: new Date().toISOString(),
    })
    @IsNotEmpty({ message: 'End time must not be empty' })
    @IsDate({ message: 'End time must be a valid date and time.' })
    @DatabaseProp({
        type: Date,
        required: true,
        index: true,
    })
    end_time: Date;

    @DatabaseProp({
        optional: true,
        type: [{ type: String, trim: true }],
    })
    plan_list: string[];

    @DatabaseProp({
        required: true,
        ref: UserEntity.name,
        index: true,
        trim: true,
    })
    user: string;
}

export const WorkFlowEntitySchema = DatabaseSchema(WorkFlowEntity);
export type WorkFlowDoc = IDatabaseDocument<WorkFlowEntity>;
