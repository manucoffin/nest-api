import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../../article/entity/article.entity';
import { Comment } from '../../comment/entity/comment.entity';
import {
  getCopyConstructions,
  getOrDefault,
} from '../../utils/copy-constructor.tools';
import { UserCategory } from '../enums/user-category.enum';

@Entity()
@Unique(['email'])
export class User {
  @OneToMany(type => Article, article => article.author)
  articles: Article[];

  @Column({ type: 'bytea', name: 'avatar', nullable: true })
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

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'boolean', name: 'is_author', default: false })
  isAuthor: boolean;

  @Column({ type: 'varchar', name: 'last_name', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', name: 'mobile_phone', length: 31 })
  mobilePhone: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @UpdateDateColumn()
  updated: Date;

  constructor(copy: Partial<User> = {}) {
    this.email = getOrDefault(copy.email, '');
    this.password = getOrDefault(copy.password, '');
    this.lastName = getOrDefault(copy.lastName, '');
    this.firstName = getOrDefault(copy.firstName, '');
    this.mobilePhone = getOrDefault(copy.mobilePhone, '');
    this.avatar = getOrDefault(copy.avatar, undefined) as any;
    this.category = getOrDefault(copy.category, undefined) as any;
    this.comments = getCopyConstructions(Comment, copy.comments) as any;
    this.articles = getCopyConstructions(Article, copy.articles) as any;
    this.id = getOrDefault(copy.id, undefined);
  }
}
