import { faker } from '@faker-js/faker';

export const WorkflowDocParamsId = [
    {
        name: 'plan',
        allowEmptyValue: false,
        required: true,
        type: 'string',
        example: faker.string.uuid(),
    },
];
