import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comment/entity/comment.entity';
import { UserCategory } from '../enums/user-category.enum';

@Entity()
export class User {
  @Column({ type: 'bytea', name: 'avatar' })
  avatar: ArrayBuffer;

  @Column({
    type: 'enum',
    name: 'category',
    enum: Object.keys(UserCategory).map(item => UserCategory[item]),
    default: 'Standard',
  })
  category: UserCategory;

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];

  @CreateDateColumn()
  created: Date;

  @Column({ type: 'varchar', name: 'email', length: 200 })
  email: string;

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

  @UpdateDateColumn()
  updated: Date;
}
