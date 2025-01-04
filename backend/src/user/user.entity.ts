import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  line_user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Schedule, (schedule) => schedule.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_schedule',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id',
    },
  })
  schedules: Schedule[];

  @AfterInsert()
  logCreate() {
    console.log('Inserting user id :', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updating user id :', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removing user id :', this.id);
  }
}
