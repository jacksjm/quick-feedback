import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import config from './config'
import log from './logger'
import { User } from './models/user'
import { Session } from './models/session'
import { Activitie } from './models/activitie'
import { Discipline } from './models/discipline'
import { Feedback } from './models/feedback'
import { Class } from './models/class'
import { Student } from './models/student'

useContainer(Container)

async function connect() {
    const connection = await createConnection({
        type: 'postgres',
        ...config.db,
        logger: 'debug',
        logging: ['error'],
        entities: [
            User,
            Session,
            Activitie,
            Class,
            Discipline,
            Feedback,
            Student
        ]
    })
    log.info(`Connected to Postgres at ${config.db.url}`)

    return connection
}

export default connect()
