import { config, createSchema, graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import {
    statelessSessions,
    withItemData,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

import { insertSeedData } from './seed-data';
import sendPasswordResetEmail from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations/';

const databaseUrl =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long they stayed in
    secret: process.env.COOKIE_SECRET,
};

interface IMailRequest {
    token: string,
    identity: string
}

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
    },
    passwordResetLink: {
        async sendToken(args) {
            const { token, identity } = args as IMailRequest;
            console.log(token, identity);
            await sendPasswordResetEmail(token, identity)
        },
    },
});

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseUrl,
            onConnect: async (keystone) => {
                console.log('Connected to Database');
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            },
        },
        lists: createSchema({
            User,
            Product,
            ProductImage,
            CartItem
        }),
        ui: {
            // TODO change this for roles
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            isAccessAllowed: ({ session }) => !!session?.data,
        },
        extendGraphqlSchema,
        //extendGraphqlSchema: (schema) => addCompatibilityForQueries(extendGraphqlSchema(schema)),
        session: withItemData(statelessSessions(sessionConfig), {
            // GraphQL Query
            User: 'id name email',
        }),
    })
);
