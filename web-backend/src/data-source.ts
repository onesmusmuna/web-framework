import { DataSource, Entity } from "typeorm";
import { Person } from "./entities/person";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "web",
  password: "root",
  entities: [Person],
  synchronize: true,
});
