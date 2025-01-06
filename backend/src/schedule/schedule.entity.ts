import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { User } from '../user/user.entity';
import { REPEAT_PATTERN } from './types/schedule.type';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: REPEAT_PATTERN,
    nullable: true,
  })
  repeat_pattern: REPEAT_PATTERN;

  @Column({ nullable: true })
  reminder_time: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.schedules)
  users: User[];

  @AfterInsert()
  logCreate() {
    console.log('Inserting schedule id :', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updating schedule id :', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removing schedule id :', this.id);
  }
}
