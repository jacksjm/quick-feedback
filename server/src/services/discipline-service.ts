import { Service } from "typedi"
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Discipline } from "../models/discipline"
import { AuthorizedContext } from "../graphql"

@Service()
export default class DisciplineService {


    @InjectRepository(Discipline)
    private readonly repository: Repository<Discipline>

    async create(
        context: AuthorizedContext,
        classId: string,
        description: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            userId,
            classId,
            description
        })
    }

    async update(
        context: AuthorizedContext,
        id: string,
        classId: string,
        description: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            id,
            userId,
            classId,
            description
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

    async find(context: AuthorizedContext, id: string) {
        const { userId } = context.session
        return this.repository.findOneOrFail({ userId, id })
    }

    async get(context: AuthorizedContext, classId: string) {
        const { userId } = context.session
        return this.repository.find({ userId, classId })
    }

}