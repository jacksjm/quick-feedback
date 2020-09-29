import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm'
import { Discipline } from './discipline'
import { Student } from './student'
import { User } from './user'

@Index(['description'], { unique: true })
@Entity()
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string

    @Column('text')
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(_ => Discipline, d => d.class)
    disciplines: Discipline[]

    @OneToMany(_ => Student, s => s.class)
    students: Student[]

    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.classes, { onDelete: 'CASCADE' })
    user: User

}
