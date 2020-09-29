import { describe, it, beforeEach } from "mocha"
import { expect } from 'chai'
import { createClient, Client } from "./helpers/graphql-helpers"
import { UserFactory } from "./factories/user-factory"
import { getDatabaseDate, resetDatabase } from "./helpers/db-helpers"

describe('Student', () => {
    let client: Client
    let userFactory: UserFactory

    before(async () => {
        client = await createClient()
        userFactory = new UserFactory(client)
    })

    beforeEach(resetDatabase)

    it('Should create a student', async () => {
        const before = await getDatabaseDate()
        const client = await userFactory.createWithClient()

        const classCreate = await client.call('createClass', { description: 'bar' })
        const student = await client.call('createStudent', { name: 'foo', classId: classCreate.id })

        expect(student).to.have.property('name').equal('foo')
        const createdAt = new Date(student.createdAt)
        expect(createdAt).to.be.greaterThan(before)
    })
})