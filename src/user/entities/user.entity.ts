import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({
    default: '',
    length: 20,
  })
  username : string;

  @Column({
    default: '',
    length: 20,
  })
  password : string;

  @Column({
    default: '',
  })
  email : string;

  @Column({
    default: '',
  })
  avatar : string;

  @Column({
    default: '',
  })
  role : string;

  @CreateDateColumn({ type: 'timestamp' })
  registered_time: Date;
}
