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
import ActivitieService from "../services/activitie-service"
import { AuthorizedContext } from "../graphql"

@ObjectType()
class Activitie {
    @Field() id: string
    @Field() description: string
    @Field() date: Date
    @Field() createdAt: Date
    @Field() updatedAt: Date
}

export class ActivitieResolver {

    @Inject()
    private readonly service: ActivitieService

    @Mutation(_ => Activitie)
    @Authorized()
    createActivitie(
        @Ctx() context: AuthorizedContext,
        @Arg('disciplineId') disciplineId: string,
        @Arg('description') description: string,
        @Arg('date') date: Date
    ): Promise<Activitie> {
        return this.service.create(context, disciplineId, description, date)
    }

    @Mutation(_ => Activitie)
    @Authorized()
    updateActivitie(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string,
        @Arg('disciplineId') disciplineId: string,
        @Arg('description') description: string,
        @Arg('date') date: Date
    ): Promise<Activitie> {
        return this.service.update(context, id, disciplineId, description, date)
    }

    @Mutation(_ => Activitie)
    @Authorized()
    removeActivitie(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string
    ): Promise<Activitie> {
        return this.service.remove(context, id)
    }

    @Query(_ => [Activitie])
    @Authorized()
    activities(
        @Ctx() context: AuthorizedContext,
        @Arg('disciplineId') disciplineId: string
    ): Promise<Activitie[]> {
        return this.service.get(context, disciplineId)
    }
}