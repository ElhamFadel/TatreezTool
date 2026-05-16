import { init } from '@instantdb/admin';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!
const token_db = process.env.INSTANT_ADMIN_TOKEN!

if (!APP_ID) {
    throw new Error('Misding APP_ID enviroment variable')
}

const db = init({
    appId: APP_ID,
    adminToken: token_db

})

export default db;
