import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  status: boolean;
}
