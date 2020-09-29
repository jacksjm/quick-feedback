import { env } from 'process'
import { resolve } from 'path'
import dotenv from 'dotenv'

const isProd = env.NODE_ENV === 'production'
const isTest = env.NODE_ENV === 'test'

if (!isProd) {
    dotenv.config({ path: resolve(__dirname, '..', '..', '.env') })
}

function getLogLevel() {
    if (isTest) {
        return 'error'
    }

    switch (env.LOG_LEVEL) {
        case 'info':
        case 'debug':
        case 'error':
            return env.LOG_LEVEL
        default:
            return 'info'
    }
}

export default {
    port: Number(env.PORT) || 8080,
    logLevel: getLogLevel(),
    cleanupInterval: Number(env.CLEANUP_INTERVAL) || 30,
    db: {
        url: env.DATABASE_URL
            || 'postgres://postgres:123456@localhost:5432/postgres',
        synchronize: !isProd || Boolean(env.FORCE_SYNC)
    },
    redis: {
        url: env.REDIS_URL || 'redis://localhost:6379'
    }
}
