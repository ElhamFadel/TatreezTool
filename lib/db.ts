import { init } from '@instantdb/admin'
import { instantConfig } from './config'

const adminDb = init({
    ...instantConfig,
    adminToken: process.env.INSTANT_ADMIN_TOKEN ?? '',
})

export default adminDb
