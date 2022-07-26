import express from "express";
import cors from "cors";
import { appDataSource } from "./data-source";
import { Person } from "./entities/person";

function app() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/users/:id", async (req, res) => {
    const personRepo = appDataSource.getRepository(Person);
    res.send(await personRepo.findBy({ id: +req.params.id }));
  });

  app.post("/users", async (req, res) => {
    const { name, age } = req.body;
    const personRepo = appDataSource.getRepository(Person);
    const person = await personRepo.save({ name, age });
    res.send(person);
  });

  app.listen(4000, () => console.log("backend listening on port 4000"));
}

appDataSource
  .initialize()
  .then(() => {
    console.log("Database connected");
    app();
  })
  .catch((err) => console.log("Database Failed"));
