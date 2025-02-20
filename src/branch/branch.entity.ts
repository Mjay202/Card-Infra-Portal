import { Profile } from "src/profile/profie.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    code: number;

    @Column({nullable: false})
    address: string;

    @Column({nullable: false})
    zone: string;

    @Column({nullable: false})
    area: string;

     @OneToMany(() => Profile, (profile) => profile.scheme, { cascade: false })
      profiles: Profile[];

}