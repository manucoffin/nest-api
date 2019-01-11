import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCategory } from '../enums/user-category.enum';

@Entity()
export class User {
  @CreateDateColumn()
  created: Date;

  @Column({ type: 'varchar', name: 'email', length: 200 })
  email: string;

  @Column({ type: 'bytea', name: 'file' })
  file: ArrayBuffer;

  @Column({ type: 'varchar', name: 'first_name', length: 100 })
  firstName: string;

  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ type: 'varchar', name: 'last_name', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', name: 'mobile_phone', length: 31 })
  mobilePhone: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: Object.keys(UserCategory).map(item => UserCategory[item]),
    default: 'Standard',
  })
  type: UserCategory;

  @UpdateDateColumn()
  updated: Date;
}
