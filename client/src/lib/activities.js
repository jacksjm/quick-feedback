import client from './graphql-client'
import gql from 'graphql-tag'

const graphql = {
    activities: gql`
        query activities($disciplineId: String!) {
            activities(disciplineId: $disciplineId) {
                id
                description
                createdAt
            }
        }
    `,

    createActivitie: gql`
        mutation createActivitie($disciplineId: String!, $date: DateTime!, $description: String!) {
            createActivitie(disciplineId: $disciplineId, date: $date, description: $description) {
                id
                description
                createdAt
            }
        }
    `,

    removeActivitie: gql`
        mutation removeActivitie($id: String!) {
            removeActivitie(id: $id) {
                id
                description
                createdAt
            }
        }
    `
}

export async function getActivities(disciplineId) {
    return client.call(graphql.activities, { disciplineId })
}

export async function createActivitie(disciplineId, date, description) {
    return client.call(graphql.createActivitie, { disciplineId, date, description })
}

export async function removeActivitie(id) {
    return client.call(graphql.removeActivitie, { id })
}
