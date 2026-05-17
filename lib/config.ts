import _schema from './schema'

export const instantConfig = {
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? '',
    schema: _schema,
}
