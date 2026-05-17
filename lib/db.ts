import { init } from '@instantdb/react'
import _schema from './schema'

const db = init({
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? '',
    schema: _schema,
})

export default db
