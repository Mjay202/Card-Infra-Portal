import { Profile } from "src/profile/profie.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: Number })
  pan_length: number;

  @OneToMany(() => Profile, (profile) => profile.scheme, { cascade: false })
  profiles: Profile[];
}