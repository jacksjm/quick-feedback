import { describe, it, beforeEach } from "mocha"
import { expect } from 'chai'
import { createClient, Client } from "./helpers/graphql-helpers"
import { UserFactory } from "./factories/user-factory"
import { getDatabaseDate, resetDatabase } from "./helpers/db-helpers"

describe('Feedback', () => {
    let client: Client
    let userFactory: UserFactory

    before(async () => {
        client = await createClient()
        userFactory = new UserFactory(client)
    })

    beforeEach(resetDatabase)

    it('Should create a feedback', async () => {
        const before = await getDatabaseDate()
        const client = await userFactory.createWithClient()

        const dateActivitie = '2020-02-01'
        const dateFeedback = '2020-02-01'
        const classCreate = await client.call('createClass', { description: 'bar' })
        const discipline = await client.call('createDiscipline', { description: 'foo', classId: classCreate.id })
        const activitie = await client.call('createActivitie', { description: 'foo', date: dateActivitie, disciplineId: discipline.id })
        const student = await client.call('createStudent', { name: 'foo', classId: classCreate.id })
        const feedback = await client.call('createFeedback', {
            date: dateFeedback,
            evaluation: 'OT',
            feedback: 'foo',
            oportunite: 'bar',
            studentId: student.id,
            activitieId: activitie.id
        })

        expect(feedback).to.have.property('evaluation').equal('OT')
        expect(feedback).to.have.property('date')
        const date = new Date(feedback.date)
        expect(date.getTime()).equal(new Date(dateFeedback).getTime())
        const createdAt = new Date(feedback.createdAt)
        expect(createdAt).to.be.greaterThan(before)
    })
})