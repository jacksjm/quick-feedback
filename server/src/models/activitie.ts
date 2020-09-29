import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm'
import { Discipline } from './discipline'
import { Feedback } from './feedback'
import { User } from './user'

@Index(['description'], { unique: true })
@Entity()
export class Activitie {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string

    @Column('text')
    description: string

    @Column('date')
    date: Date

    @Column('uuid')
    disciplineId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(_ => Feedback, f => f.activitie)
    feedbacks: Feedback[]

    @JoinColumn({ name: 'disciplineId', referencedColumnName: 'id' })
    @ManyToOne(_ => Discipline, d => d.activities, { onDelete: 'CASCADE' })
    discipline: Discipline

    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.activities, { onDelete: 'CASCADE' })
    user: User

}
