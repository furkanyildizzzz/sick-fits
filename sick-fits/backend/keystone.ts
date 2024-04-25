import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { createAuth } from '@keystone-next/auth';

import { statelessSessions, withItemData, } from '@keystone-next/keystone/session'
import { insertSeedData } from './seed-data';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stayed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
})


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
        console.log('Connected to Database')
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      }
    },
    lists: createSchema({
      User,
      Product,
      ProductImage
    }),
    ui: {
      // TODO change this for roles
      isAccessAllowed: ({ session }) => !!session?.data,
    },

    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email`,
    }),


  }));
