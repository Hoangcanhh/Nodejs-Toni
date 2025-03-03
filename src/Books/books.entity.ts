import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publication_date: Date;

  @Column()
  available: boolean;
}
