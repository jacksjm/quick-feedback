import {
    ObjectType,
    Field,
    Mutation,
    Arg,
    Ctx,
    Authorized,
    Query
} from "type-graphql"
import { Inject } from "typedi"
import FeedbackService from "../services/feedback-service"
import { AuthorizedContext } from "../graphql"
import { Student } from "./student-resolver"

@ObjectType()
class Feedback {
    @Field() id: string
    @Field({ nullable: true }) date?: Date
    @Field({ nullable: true }) evaluation?: string
    @Field({ nullable: true }) feedback?: string
    @Field({ nullable: true }) oportunite?: string
    @Field() studentId: string
    @Field() activitieId: string
    @Field() createdAt: Date
    @Field() updatedAt: Date
    @Field(_ => Student, { nullable: true }) student?: Student
}

@ObjectType()
class FeedbackUpdate {
    @Field() id: string
    @Field({ nullable: true }) date?: Date
    @Field({ nullable: true }) evaluation?: string
    @Field({ nullable: true }) feedback?: string
    @Field({ nullable: true }) oportunite?: string
    @Field() createdAt: Date
    @Field() updatedAt: Date
}

export class FeedbackResolver {

    @Inject()
    private readonly service: FeedbackService

    @Mutation(_ => FeedbackUpdate)
    @Authorized()
    updateFeedback(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string,
        @Arg('date') date: Date,
        @Arg('evaluation') evaluation: string,
        @Arg('feedback', { nullable: true }) feedback?: string,
        @Arg('oportunite', { nullable: true }) oportunite?: string
    ): Promise<FeedbackUpdate> {
        return this.service.update(context, id, date, evaluation, feedback, oportunite)
    }

    @Query(_ => [Feedback])
    @Authorized()
    feedbacks(
        @Ctx() context: AuthorizedContext,
        @Arg('activitieId') activitieId: string
    ): Promise<Feedback[]> {
        return this.service.get(context, activitieId)
    }
}