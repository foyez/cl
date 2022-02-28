// Libraries
import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { resolve } from "path";

// Files
import { Post, Member } from "./entities";
import { rootPath } from "./utils";
import { ASSETS_DEST, __prod__ } from "./utils/constants";
import { router } from "./api";

const sqliteOptions: ConnectionOptions = {
  type: "sqlite",
  database: `${rootPath}/data/club.sqlite`,
  logging: !__prod__,
  synchronize: !__prod__, // automatically create table
  entities: [Post, Member],
};

const main = async () => {
  // Database setup
  await createConnection(sqliteOptions);

  // Server setup
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors({ credentials: true, origin: true }));
  app.use(`/assets`, express.static(resolve(process.cwd(), ASSETS_DEST)));
  app.use(router);

  const PORT = 4000;
  app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
};

main().catch((err) => console.log(err));
