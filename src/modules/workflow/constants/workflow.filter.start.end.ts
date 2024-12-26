import { BadRequestException } from '@nestjs/common';

export function WorkflowFilterStartEnd(
    planDate: Date,
    startTime: Date,
    endTime: Date,
    firstMessage?: string,
    lastMessage?: string
) {
    const now = new Date();
    const currentTimePlus30Min = new Date(now.getTime() + 15 * 60 * 1000); // Current time + 30 minutes

    // Ensure start_time is at least 30 minutes greater than the current time
    if (startTime <= currentTimePlus30Min) {
        throw new BadRequestException({
            message: firstMessage,
        });
    }

    // Ensure start_time is less than end_time
    if (startTime >= endTime) {
        throw new BadRequestException({
            message: lastMessage,
        });
    }

    // Ensure start_time and end_time correspond to the same day as plan_date
    const isSameDay = (date: Date, targetDate: Date) => {
        return (
            date.getUTCFullYear() === targetDate.getUTCFullYear() &&
            date.getUTCMonth() === targetDate.getUTCMonth() &&
            date.getUTCDate() === targetDate.getUTCDate()
        );
    };

    if (!isSameDay(startTime, planDate) || !isSameDay(endTime, planDate)) {
        throw new BadRequestException({
            message:
                'Start time and end time must correspond to the same day as the plan date.',
        });
    }
}
