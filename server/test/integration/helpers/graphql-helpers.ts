import { createTestClient, ApolloServerTestClient } from "apollo-server-testing"
import { ApolloServerBase, gql } from "apollo-server-core"
import { createSchema, contextHandler } from '../../../src/graphql'

const api = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }

    mutation createSession($email: String!, $password: String!) {
        createSession(email: $email, password: $password) {
            token createdAt
        }
    }

    mutation createClass($description: String!){
        createClass(description: $description) {
            id
            description
            createdAt
        }
    }

    mutation createDiscipline($description: String!, $classId: String!){
        createDiscipline(description: $description, classId: $classId) {
            id
            description
            createdAt
        }
    }

    mutation createActivitie($description: String!, $date: DateTime!, $disciplineId: String!){
        createActivitie(description: $description, date: $date, disciplineId: $disciplineId) {
            id
            date
            description
            createdAt
        }
    }

    mutation createFeedback(
        $date: DateTime!,
        $evaluation: String!,
        $feedback: String!,
        $oportunite: String!,
        $studentId: String!,
        $activitieId: String!
    ){
        createFeedback(
            date: $date,
            evaluation: $evaluation,
            feedback: $feedback,
            oportunite: $oportunite,
            studentId: $studentId,
            activitieId: $activitieId
        ) {
            id
            date
            evaluation
            createdAt
        }
    }

    mutation createStudent($name: String!, $classId: String!){
        createStudent(name: $name, classId: $classId) {
            id
            name
            createdAt
        }
    }

    query currentUser { currentUser { id name email } }
`

async function callApi(
    this: ApolloServerTestClient,
    operationName: string,
    variables?: Record<string, unknown>
) {
    const result = await this.query({ query: api, operationName, variables })
    if (result.errors?.length) {
        throw result.errors[0]
    }
    return result.data?.[operationName]
}

export async function createClient(authToken?: string) {
    const headers = {
        authorization: authToken
    }

    const client = createTestClient(
        new ApolloServerBase({
            schema: await createSchema(),
            context: () => contextHandler({ ctx: { headers } })
        })
    )

    return { ...client, call: callApi.bind(client) }
}

type PromiseType<T> = T extends Promise<infer U> ? U : never
export type Client = PromiseType<ReturnType<typeof createClient>>