import { Branch } from "src/branch/branch.entity";
import { CurrencyType, Fee } from "src/common/types";
import { Scheme } from "src/scheme/scheme.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: String })
  card_name: string;

  @Column({ nullable: false, type: Number })
  bin_prefix: number;

  @Column({ nullable: false, type: Number })
  expiration_in_month: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: CurrencyType, nullable: true })
  currency: CurrencyType;

  @Column({ type: 'jsonb', default: [] })
  fees: Fee[];

  @ManyToOne(() => Scheme, (scheme) => scheme.profiles, {
    onDelete: 'CASCADE',
  })
    
  @JoinColumn({ name: 'scheme_id' })
  scheme: Scheme;

  @ManyToOne(() => Branch, (branch) => branch.profiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;
}