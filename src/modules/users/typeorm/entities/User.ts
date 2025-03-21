import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Exclude} from 'class-transformer'
@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @Column()
    qtd_bolin: number;

    @Column()
    qtd_total_bolin: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @Expose({name: 'avatar_url'})
    // getAvatarUrl(): string | null {
    //   if(!this.avatar){
    //     return null;
    //   }

    //   return `${process.env.APP_API_URL}/files/${this.avatar}`;
    // }
}

export default User;
