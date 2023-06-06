import { BaseEntity, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id: string

    @Column({ unique: true })
    @Index()
    email: string

    @Column({ nullable: true })
    @Exclude()
    password: string

    @Column({ type: "boolean", default: false })
    email_verified: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @BeforeInsert()
    async hashPassword(): Promise<string> {
        return this.password = await bcrypt.hash(this.password, 10)
    }
}
