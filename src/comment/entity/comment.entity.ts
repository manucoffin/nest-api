import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Comment {
  @JoinColumn({ name: 'author_id' })
  @ManyToOne(type => User, author => author.comments)
  author: User;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @CreateDateColumn()
  created: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
}
