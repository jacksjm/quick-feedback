import client from './graphql-client'
import gql from 'graphql-tag'

const graphql = {
    feedbacks: gql`
        query feedbacks($activitieId: String!) {
            feedbacks(activitieId: $activitieId) {
                id
                student {
                    id
                    name
                }
                studentId
                activitieId
                date
                evaluation
                feedback
                oportunite
                createdAt
            }
        }
    `,

    updateFeedback: gql`
        mutation updateFeedback($id: String!, $date: DateTime!, $evaluation: String!, $feedback: String!, $oportunite: String!) {
            updateFeedback(id: $id, date: $date, evaluation: $evaluation, feedback: $feedback, oportunite: $oportunite) {
                id
            }
        }
    `
}

export async function getFeedbacks(activitieId) {
    return client.call(graphql.feedbacks, { activitieId })
}

export async function updateFeedback(Feedback) {
    return client.call(graphql.updateFeedback, { ...Feedback, date: new Date(Feedback.date + "T00:00:00.000Z") })
}
