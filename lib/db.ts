import { init } from '@instantdb/react';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!

if (!APP_ID) {
    throw new Error('Misding APP_ID enviroment variable')
}

const db = init({ appId: APP_ID })

export default db;
