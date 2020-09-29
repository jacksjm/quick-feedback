import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Index
} from 'typeorm'
import { Session } from './session'
import { Activitie } from './activitie'
import { Class } from './class'
import { Discipline } from './discipline'
import { Feedback } from './feedback'
import { Student } from './student'

@Index(['email'], { unique: true })
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    email: string

    @Column('text')
    name: string

    @Column('text')
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(_ => Session, s => s.user)
    sessions: Session[]

    @OneToMany(_ => Activitie, a => a.user)
    activities: Activitie[]

    @OneToMany(_ => Class, c => c.user)
    classes: Class[]

    @OneToMany(_ => Discipline, d => d.user)
    disciplines: Discipline[]

    @OneToMany(_ => Feedback, f => f.user)
    feedbacks: Feedback[]

    @OneToMany(_ => Student, s => s.user)
    students: Student[]

}
