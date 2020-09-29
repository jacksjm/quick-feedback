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
import { Class } from './class'
import { Activitie } from './activitie'
import { User } from './user'

@Index(['description'], { unique: true })
@Entity()
export class Discipline {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('uuid')
    userId: string

    @Column('text')
    description: string

    @Column('uuid')
    classId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(_ => Activitie, a => a.discipline)
    activities: Activitie[]

    @JoinColumn({ name: 'classId', referencedColumnName: 'id' })
    @ManyToOne(_ => Class, c => c.disciplines, { onDelete: 'CASCADE' })
    class: Class

    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    @ManyToOne(_ => User, u => u.disciplines, { onDelete: 'CASCADE' })
    user: User

}
