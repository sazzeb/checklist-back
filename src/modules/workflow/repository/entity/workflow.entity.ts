import { DatabaseEntityBase } from 'src/common/database/bases/database.entity';
import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

export const WorkFlowTableName = 'workflow';

@DatabaseEntity({ collection: WorkFlowTableName })
export class WorkFlowEntity extends DatabaseEntityBase {
    @DatabaseProp({
        required: true,
        index: true,
        maxlength: 250,
    })
    plan: string;

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

    @DatabaseProp({
        type: String,
        required: true,
        index: true,
        validate: {
            validator: function (value: string) {
                // Regex for HH:MM AM/PM format
                return /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i.test(value);
            },
            message: 'Start time must be in HH:MM AM/PM format.',
        },
    })
    start_time: string;

    @DatabaseProp({
        type: String,
        required: true,
        index: true,
        validate: {
            validator: function (value: string) {
                return /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i.test(value);
            },
            message: 'End time must be in HH:MM AM/PM format.',
        },
    })
    end_time: string;

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
