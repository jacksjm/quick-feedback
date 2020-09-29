import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    JoinColumn,
    ManyToOne
} from 'typeorm'
import { Activitie } from './activitie'
import { Student } from './student'
import { User } from './user'

@Index(['evaluation'], { unique: true })
@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string

    @Column('date', { nullable: true })
    date?: Date

    @Column('text', { nullable: true })
    evaluation?: string

    @Column('text', { nullable: true })
    feedback?: string

    @Column('text', { nullable: true })
    oportunite?: string

    @Column('uuid')
    activitieId: string

    @Column('uuid')
    studentId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @JoinColumn({ name: 'activitieId', referencedColumnName: 'id' })
    @ManyToOne(_ => Activitie, a => a.feedbacks, { onDelete: 'CASCADE' })
    activitie: Activitie

    @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
    @ManyToOne(_ => Student, s => s.feedbacks, { eager: true, onDelete: 'CASCADE' })
    student: Student

    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.feedbacks, { onDelete: 'CASCADE' })
    user: User

}
