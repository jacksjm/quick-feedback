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
import ClassService from "../services/class-service"
import { AuthorizedContext } from "../graphql"

@ObjectType()
class Class {
    @Field() id: string
    @Field() description: string
    @Field() createdAt: Date
    @Field() updatedAt: Date
}

export class ClassResolver {

    @Inject()
    private readonly service: ClassService

    @Mutation(_ => Class)
    @Authorized()
    createClass(
        @Ctx() context: AuthorizedContext,
        @Arg('description') description: string
    ): Promise<Class> {
        return this.service.create(context, description)
    }

    @Mutation(_ => Class)
    @Authorized()
    updateClass(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string,
        @Arg('description') description: string,
    ): Promise<Class> {
        return this.service.update(context, id, description)
    }

    @Mutation(_ => Class)
    @Authorized()
    removeClass(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string
    ): Promise<Class> {
        return this.service.remove(context, id)
    }

    @Query(_ => [Class])
    @Authorized()
    classes(
        @Ctx() context: AuthorizedContext,
        @Arg('search', { nullable: true }) search?: string
    ): Promise<Class[]> {
        return this.service.get(context, search)
    }
}