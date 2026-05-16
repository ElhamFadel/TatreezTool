import { i } from '@instantdb/react';

const _schema = i.schema({
    entities: {
        profiles: i.entity({
            userId: i.string(),
            email: i.string(),
            passwordHash: i.string(),
            communityMember: i.boolean(),
            createdAt: i.number(),
        }),
        desings: i.entity({
            userId: i.string(),
            designName: i.string(),
            designData: i.json(),
            createdAt: i.number(),
            updatedAt: i.number(),
            isDeleted: i.boolean(),
            deletedAt: i.number().optional(),
            isShared: i.boolean(),
        }),

    }
},

);

