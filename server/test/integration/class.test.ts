import { describe, it, beforeEach } from "mocha"
import { expect } from 'chai'
import { createClient, Client } from "./helpers/graphql-helpers"
import { UserFactory } from "./factories/user-factory"
import { getDatabaseDate, resetDatabase } from "./helpers/db-helpers"

describe('Class', () => {
    let client: Client
    let userFactory: UserFactory

    before(async () => {
        client = await createClient()
        userFactory = new UserFactory(client)
    })

    beforeEach(resetDatabase)

    it('Should create a class', async () => {
        const before = await getDatabaseDate()
        const client = await userFactory.createWithClient()

        const classCreate = await client.call('createClass', { description: 'bar' })

        expect(classCreate).to.have.property('description').equal('bar')
        const createdAt = new Date(classCreate.createdAt)
        expect(createdAt).to.be.greaterThan(before)
    })
})