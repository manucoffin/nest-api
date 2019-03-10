import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { getCopyConstructions } from '../../utils/copy-constructor.tools';

@Entity()
export class Article {
  @JoinColumn({ name: 'author_id' })
  @ManyToOne(type => User, author => author.articles)
  author: User;

  @CreateDateColumn()
  created: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;
}
