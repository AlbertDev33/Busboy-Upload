import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('urluploads')
class UrlUploads {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  url: string;

  @Column()
  fileName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UrlUploads;
