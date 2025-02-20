import { Fee } from "src/common/types";
import { Scheme } from "src/scheme/scheme.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: String })
  card_name: string;

    @ManyToOne(() => Scheme, (scheme) => scheme.profiles, {
        onDelete: 'CASCADE',
    })
    scheme: Scheme;
    
  @Column({ nullable: false, type: Number })
  bin_prefix: number;

  @Column({ nullable: false, type: Number })
  expiration_in_month: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'jsonb', default: [] })
  fees: Fee[];
}