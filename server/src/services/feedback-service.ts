import { Service } from "typedi"
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Feedback } from "../models/feedback"
import { AuthorizedContext } from "../graphql"

@Service()
export default class FeedbackService {


    @InjectRepository(Feedback)
    private readonly repository: Repository<Feedback>

    async create(
        context: AuthorizedContext,
        studentId: string,
        activitieId: string,
        date?: Date,
        evaluation?: string,
        feedback?: string,
        oportunite?: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            userId,
            date,
            evaluation,
            feedback,
            oportunite,
            studentId,
            activitieId
        })
    }

    async update(
        context: AuthorizedContext,
        id: string,
        date: Date,
        evaluation: string,
        feedback?: string,
        oportunite?: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            id,
            userId,
            date,
            evaluation,
            feedback,
            oportunite
        })
    }

    async remove(context: AuthorizedContext, id: string) {
        const { userId } = context.session
        const existing = await this.repository.findOneOrFail({
            userId,
            id
        })

        await this.repository.remove({ ...existing })

        return existing
    }

    async get(context: AuthorizedContext, activitieId: string) {
        const { userId } = context.session
        const feedbacks = await this.repository.find({ userId, activitieId })

        return feedbacks.map( feedback => ({ ...feedback, date: new Date(feedback.date || '') }))
    }

}