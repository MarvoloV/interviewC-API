import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Commerce {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
}
