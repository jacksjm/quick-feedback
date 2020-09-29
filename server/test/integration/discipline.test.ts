import { describe, it, beforeEach } from "mocha"
import { expect } from 'chai'
import { createClient, Client } from "./helpers/graphql-helpers"
import { UserFactory } from "./factories/user-factory"
import { getDatabaseDate, resetDatabase } from "./helpers/db-helpers"

describe('Discipline', () => {
    let client: Client
    let userFactory: UserFactory

    before(async () => {
        client = await createClient()
        userFactory = new UserFactory(client)
    })

    beforeEach(resetDatabase)

    it('Should create a discipline', async () => {
        const before = await getDatabaseDate()
        const client = await userFactory.createWithClient()

        const classCreate = await client.call('createClass', { description: 'bar' })
        const discipline = await client.call('createDiscipline', { description: 'foo', classId: classCreate.id })

        expect(discipline).to.have.property('description').equal('foo')
        const createdAt = new Date(discipline.createdAt)
        expect(createdAt).to.be.greaterThan(before)
    })
})