import { Service, Inject } from "typedi"
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Student } from "../models/student"
import { AuthorizedContext } from "../graphql"
import DisciplineService from "./discipline-service"
import ActivitieService from "./activitie-service"
import FeedbackService from "./feedback-service"

@Service()
export default class StudentService {

    @Inject(_ => DisciplineService)
    private readonly disciplineService: DisciplineService

    @Inject(_ => ActivitieService)
    private readonly activitieService: ActivitieService

    @Inject(_ => FeedbackService)
    private readonly feedbackService: FeedbackService

    @InjectRepository(Student)
    private readonly repository: Repository<Student>

    async create(
        context: AuthorizedContext,
        classId: string,
        name: string
    ) {
        const { userId } = context.session
        const student = await this.repository.save({
            userId,
            classId,
            name
        })

        const disciplines = await this.disciplineService.get(context, classId)

        await disciplines.map(async discipline => {
            const activities = await this.activitieService.get(context, discipline.id)

            activities.map(activitie => this.feedbackService.create(context,student.id,activitie.id))
        })

        return student
    }

    async update(
        context: AuthorizedContext,
        id: string,
        classId: string,
        name: string
    ) {
        const { userId } = context.session
        return this.repository.save({
            id,
            userId,
            classId,
            name
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

    async get(context: AuthorizedContext, classId: string) {
        const { userId } = context.session
        return this.repository.find({ userId, classId })
    }

}