import { describe, it, beforeEach } from "mocha"
import { expect } from 'chai'
import { createClient, Client } from "./helpers/graphql-helpers"
import { UserFactory } from "./factories/user-factory"
import { getDatabaseDate, resetDatabase } from "./helpers/db-helpers"

describe('Activitie', () => {
    let client: Client
    let userFactory: UserFactory

    before(async () => {
        client = await createClient()
        userFactory = new UserFactory(client)
    })

    beforeEach(resetDatabase)

    it('Should create an activitie', async () => {
        const before = await getDatabaseDate()
        const client = await userFactory.createWithClient()

        const dateActivitie = '2020-02-01'
        const classCreate = await client.call('createClass', { description: 'bar' })
        const discipline = await client.call('createDiscipline', { description: 'foo', classId: classCreate.id })
        const activitie = await client.call('createActivitie', { description: 'foo', date: dateActivitie, disciplineId: discipline.id })

        expect(activitie).to.have.property('description').equal('foo')
        expect(activitie).to.have.property('date')
        const date = new Date(activitie.date)
        expect(date.getTime()).equal(new Date(dateActivitie).getTime())
        const createdAt = new Date(activitie.createdAt)
        expect(createdAt).to.be.greaterThan(before)
    })
})