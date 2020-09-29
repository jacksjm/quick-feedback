import client from './graphql-client'
import gql from 'graphql-tag'

const graphql = {
    students: gql`
        query students($classId: String!) {
            students(classId: $classId) {
                id
                name
                createdAt
            }
        }
    `,

    createStudent: gql`
        mutation createStudent($classId: String!, $name: String!) {
            createStudent(classId: $classId, name: $name) {
                id
                name
                createdAt
            }
        }
    `,

    removeStudent: gql`
        mutation removeStudent($id: String!) {
            removeStudent(id: $id) {
                id
                name
                createdAt
            }
        }
    `
}

export async function getStudents(classId) {
    return client.call(graphql.students, { classId })
}

export async function createStudent(classId, name) {
    return client.call(graphql.createStudent, { classId, name })
}

export async function removeStudent(id) {
    return client.call(graphql.removeStudent, { id })
}
