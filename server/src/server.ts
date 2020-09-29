import "reflect-metadata"
import Koa from 'koa'
import cors from '@koa/cors'
import config from './config'
import { initGraphqlServer } from './graphql'
import dbConnection from './database'
import log from "./logger"
import { initStaticFiles } from "./static"
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

async function run() {
    await dbConnection
    const http = app.listen(config.port)
    await initGraphqlServer(app, http)
    await initStaticFiles(app)
    log.info(`Listening on port ${config.port}`)
}

run().catch(error => {
    log.error(error.stack ?? error.message)
    process.exit(1)
})
