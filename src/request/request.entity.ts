import { CardRequestStatus, CardRequestStatusTrack, CurrencyType } from "src/common/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: String })
  branch_name: string;

  @Column({ nullable: false, type: String })
  initiator: string;

  @Column({ nullable: false, type: String })
  card_type: string;

  @Column({ nullable: false, type: Number })
  card_charges: number;

  @Column({ nullable: false, type: Number })
  quantity: number;

  @Column({ nullable: false, type: Number })
  batch: number;

  @Column({ nullable: false, type: 'enum', enum: CurrencyType, default: 'NGN' })
  currency: CurrencyType;

  @Column({
    nullable: false,
    type: 'enum',
    enum: CardRequestStatus,
    default: CardRequestStatus.PENDING,
  })
  status: CardRequestStatus;

  @Column({ nullable: false, type: 'enum', enum: CardRequestStatusTrack, default: CardRequestStatusTrack.UNTRACKED })
  status_track: CardRequestStatusTrack;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}