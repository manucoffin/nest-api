import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../article/entity/article.entity';
import { User } from '../../user/entity/user.entity';
import { getCopyConstructions } from '../../utils/copy-constructor.tools';

@Entity()
export class Comment {

  @JoinColumn({ name: 'article_id' })
  @ManyToOne(type => Article, article => article.comments)
  article: Article;
  @JoinColumn({ name: 'author_id' })
  @ManyToOne(type => User, author => author.comments)
  author: User;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @CreateDateColumn()
  created: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // constructor() {
  //   this.author = getCopyConstruction(User, copy.author);
  // }
}
