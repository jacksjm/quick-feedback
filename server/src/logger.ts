import winston from 'winston'
import config from './config'
import koaMorgan from 'koa-morgan'

const log = winston.createLogger({
    level: config.logLevel,
    format: winston.format.cli(),
    transports: [
        new winston.transports.Console()
    ]
})

export default log

export const httpLogger = koaMorgan(
    ':id - :method :url - :response-time',
    { stream: { write: (message: string) => log.info(message) } }
)