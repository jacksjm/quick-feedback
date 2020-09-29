import { Service, Inject } from "typedi"
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Activitie } from "../models/activitie"
import { AuthorizedContext } from "../graphql"
import DisciplineService from "./discipline-service"
import StudentService from "./student-service"
import FeedbackService from "./feedback-service"

@Service()
export default class ActivitieService {

    @Inject(_ => DisciplineService)
    private readonly disciplineService: DisciplineService

    @Inject(_ => StudentService)
    private readonly studentService: StudentService

    @Inject(_ => FeedbackService)
    private readonly feedbackService: FeedbackService

    @InjectRepository(Activitie)
    private readonly repository: Repository<Activitie>

    async create(
        context: AuthorizedContext,
        disciplineId: string,
        description: string,
        date: Date
    ) {
        const { userId } = context.session

        const discipline = await this.disciplineService
            .find(context, disciplineId)

        const students = await this.studentService.get(context, discipline.classId)

        const activite = await this.repository.save({
            userId,
            disciplineId,
            description,
            date
        })

        students.map( student => this.feedbackService.create(context, student.id, activite.id) )

        return activite
    }

    async update(
        context: AuthorizedContext,
        id: string,
        disciplineId: string,
        description: string,
        date: Date
    ) {
        const { userId } = context.session
        return this.repository.save({
            id,
            userId,
            disciplineId,
            description,
            date
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

    async get(context: AuthorizedContext, disciplineId: string) {
        const { userId } = context.session
        return this.repository.find({ userId, disciplineId })
    }

}