import { init } from '@instantdb/admin'
import _schema from './schema'

const adminDb = init({
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? '',
    adminToken: process.env.INSTANT_ADMIN_TOKEN ?? '',
    schema: _schema,
})

export default adminDb
