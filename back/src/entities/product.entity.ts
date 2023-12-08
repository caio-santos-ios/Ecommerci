import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from "typeorm"

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    value: number

    @Column({default: 100})
    stock: number

    @Column({nullable: true})
    image: string;

    @AfterLoad()
    getValue() {
        this.value = Number(this.value)
    }
}

export default Product 