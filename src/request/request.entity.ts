import { CardRequestStatus, CurrencyType } from "src/common/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'string' })
  branch_name: string;

  @Column({ nullable: false, type: 'string' })
  initiator: string;

  @Column({ nullable: false, type: 'string' })
  card_type: string;

  @Column({ nullable: false, type: 'number' })
  card_charges: number;

  @Column({ nullable: false, type: 'number' })
  quantity: number;

  @Column({ nullable: false, type: 'number' })
  batch: number;

  @Column({ nullable: false, type: 'enum' })
currency: CurrencyType;
    
  @Column({ nullable: false, type: 'enum' })
  status: CardRequestStatus;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}