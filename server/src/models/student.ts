import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { Class } from './class'
import { Feedback } from './feedback'
import { User } from './user'

@Index(['name'], { unique: true })
@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string

    @Column('text')
    name: string

    @Column('uuid')
    classId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @JoinColumn({ name: 'classId', referencedColumnName: 'id' })
    @ManyToOne(_ => Class, c => c.students, { onDelete: 'CASCADE' })
    class: Class

    @OneToMany(_ => Feedback, f => f.student)
    feedbacks: Feedback[]

    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.students, { onDelete: 'CASCADE' })
    user: User

}
