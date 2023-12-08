import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import { getRounds, hashSync } from "bcryptjs"

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: false})
    isAdmin: boolean

    @Column({nullable: true})
    confirmationToken: string

    @Column({nullable: true, default: false})
    accountValided: boolean

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isHash = getRounds(this.password)
        if(!isHash){
            this.password = hashSync(this.password, 10)
        }
    }
}

export default User