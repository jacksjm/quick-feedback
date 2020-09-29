import client from './graphql-client'
import gql from 'graphql-tag'

const graphql = {
    classes: gql`
        query classes($search: String!) {
            classes(search: $search) {
                id
                description
                createdAt
            }
        }
    `,

    createClass: gql`
        mutation createClass($description: String!) {
            createClass(description: $description) {
                id
                description
                createdAt
            }
        }
    `,

    removeClass: gql`
        mutation removeClass($id: String!) {
            removeClass(id: $id) {
                id
                description
                createdAt
            }
        }
    `
}

export async function getClasses(search) {
    return client.call(graphql.classes, { search })
}

export async function createClass(description) {
    return client.call(graphql.createClass, { description })
}

export async function removeClass(id) {
    return client.call(graphql.removeClass, { id })
}
