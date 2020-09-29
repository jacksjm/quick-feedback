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
import DisciplineService from "../services/discipline-service"
import { AuthorizedContext } from "../graphql"

@ObjectType()
class Discipline {
    @Field() id: string
    @Field() description: string
    @Field() createdAt: Date
    @Field() updatedAt: Date
}

export class DisciplineResolver {

    @Inject()
    private readonly service: DisciplineService

    @Mutation(_ => Discipline)
    @Authorized()
    createDiscipline(
        @Ctx() context: AuthorizedContext,
        @Arg('classId') classId: string,
        @Arg('description') description: string
    ): Promise<Discipline> {
        return this.service.create(context, classId, description)
    }

    @Mutation(_ => Discipline)
    @Authorized()
    updateDiscipline(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string,
        @Arg('classId') classId: string,
        @Arg('description') description: string
    ): Promise<Discipline> {
        return this.service.update(context, id, classId, description)
    }

    @Mutation(_ => Discipline)
    @Authorized()
    removeDiscipline(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string
    ): Promise<Discipline> {
        return this.service.remove(context, id)
    }

    @Query(_ => [Discipline])
    @Authorized()
    disciplines(
        @Ctx() context: AuthorizedContext,
        @Arg('classId') classId: string
    ): Promise<Discipline[]> {
        return this.service.get(context, classId)
    }
}