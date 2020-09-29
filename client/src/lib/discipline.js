import client from './graphql-client'
import gql from 'graphql-tag'

const graphql = {
    disciplines: gql`
        query disciplines($classId: String!) {
            disciplines(classId: $classId) {
                id
                description
                createdAt
            }
        }
    `,

    createDiscipline: gql`
        mutation createDiscipline($classId: String!, $description: String!) {
            createDiscipline(classId: $classId, description: $description) {
                id
                description
                createdAt
            }
        }
    `,

    removeDiscipline: gql`
        mutation removeDiscipline($id: String!) {
            removeDiscipline(id: $id) {
                id
                description
                createdAt
            }
        }
    `
}

export async function getDisciplines(classId) {
    return client.call(graphql.disciplines, { classId })
}

export async function createDiscipline(classId, description) {
    return client.call(graphql.createDiscipline, { classId, description })
}

export async function removeDiscipline(id) {
    return client.call(graphql.removeDiscipline, { id })
}
