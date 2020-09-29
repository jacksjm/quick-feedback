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
import StudentService from "../services/student-service"
import { AuthorizedContext } from "../graphql"

@ObjectType()
export class Student {
    @Field() id: string
    @Field() name: string
    @Field() createdAt: Date
    @Field() updatedAt: Date
}

export class StudentResolver {

    @Inject()
    private readonly service: StudentService

    @Mutation(_ => Student)
    @Authorized()
    createStudent(
        @Ctx() context: AuthorizedContext,
        @Arg('classId') classId: string,
        @Arg('name') name: string
    ): Promise<Student> {
        return this.service.create(context, classId, name)
    }

    @Mutation(_ => Student)
    @Authorized()
    updateStudent(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string,
        @Arg('classId') classId: string,
        @Arg('name') name: string
    ): Promise<Student> {
        return this.service.update(context, id, classId, name)
    }

    @Mutation(_ => Student)
    @Authorized()
    removeStudent(
        @Ctx() context: AuthorizedContext,
        @Arg('id') id: string
    ): Promise<Student> {
        return this.service.remove(context, id)
    }

    @Query(_ => [Student])
    @Authorized()
    students(
        @Ctx() context: AuthorizedContext,
        @Arg('classId') classId: string
    ): Promise<Student[]> {
        return this.service.get(context, classId)
    }
}