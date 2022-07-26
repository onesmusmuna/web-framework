import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
