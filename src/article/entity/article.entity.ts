import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comment/entity/comment.entity';
import { User } from '../../user/entity/user.entity';
import {
  getCopyConstructions,
  getOrDefault,
} from '../../utils/copy-constructor.tools';

@Entity()
export class Article {
  @JoinColumn({ name: 'author_id' })
  @ManyToOne(type => User, author => author.articles)
  author: string;

  @OneToMany(type => Comment, comment => comment.article)
  comments: Comment[];

  @Column({ type: 'text', name: 'content' })
  content: string;

  @CreateDateColumn()
  created: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  constructor(copy: Partial<Article> = {}) {
    this.title = getOrDefault(copy.title, '');
    this.author = getOrDefault(copy.author, '');
    this.content = getOrDefault(copy.content, '');
    this.comments = getCopyConstructions(Comment, copy.comments) as any;
    this.id = getOrDefault(copy.id, undefined);
  }
}
