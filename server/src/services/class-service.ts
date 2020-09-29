import { Service } from "typedi"
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository, Brackets } from 'typeorm'
import { Class } from "../models/class"
import { AuthorizedContext } from "../graphql"

@Service()
export default class ClassService {


    @InjectRepository(Class)
    private readonly repository: Repository<Class>

    async create(
        context: AuthorizedContext,
        description: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            userId,
            description
        })
    }

    async update(
        context: AuthorizedContext,
        id: string,
        description: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            id,
            userId,
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

    async get(context: AuthorizedContext, search?: string) {
        const { userId } = context.session
        const query = this.repository
            .createQueryBuilder('class')
            .leftJoin('class.students', 'student')
            .leftJoin('class.disciplines', 'discipline')
            .where('class.userId = :userId', { userId })
            // TODO: Pagination
            .take(50)

        if (search) {
            query
                .andWhere(new Brackets(qb => qb
                    .where('class.description ILIKE :search')
                ))
                .setParameter('search', `%${search}%`)
        }

        return query.getMany()
    }

}