import { Router } from "express";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Member } from "./entities/Member";
import { uploadImage } from "./middleware/uploadImage";
import { ASSETS_DEST, SERVER_BASE_URI } from "./utils/constants";

const router = Router();

// delete all member
router.delete("/profile", async (_req, res) => {
  await Member.delete({});

  res.status(204).send({ status: "success" });
});

// delete a member
router.delete("/profile/:id", async (req, res) => {
  const { id } = req.params;
  await Member.delete(id);

  res.status(204).send({ status: "success" });
});

// get all member
router.get("/profile", async (req, res) => {
  const team = req.query.team as string;
  const members = team
    ? await Member.createQueryBuilder("member")
        .where("LOWER(member.team) = LOWER(:team)", { team })
        .getMany()
    : await Member.find();

  res.status(200).send({ data: members, status: "success" });
});

// get a member
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne(id);

  res.status(200).send({ data: member, status: "success" });
});

// update a member
router.put("/profile/:id", uploadImage.single("image"), async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  const { firstName, lastName, team } = req.body;

  const dataToUpdate: QueryDeepPartialEntity<Member> = {};

  if (file) {
    const filePath = file?.path.split(ASSETS_DEST)[1];
    const imageUrl = `${SERVER_BASE_URI}/${ASSETS_DEST}${filePath}`;
    dataToUpdate.imageUrl = imageUrl;
  }
  if (firstName) dataToUpdate.firstName = firstName;
  if (lastName) dataToUpdate.lastName = lastName;
  if (team) dataToUpdate.team = team;

  await Member.update(id, dataToUpdate);
  const updatedMember = await Member.findOne(id);

  res.status(200).send({ data: updatedMember, status: "success" });
});

// add a member
router.post("/profile", uploadImage.single("image"), async (req, res) => {
  const { file } = req;
  const { firstName, lastName, team } = req.body;

  const filePath = file?.path.split(ASSETS_DEST)[1];
  const imageUrl = `${SERVER_BASE_URI}/${ASSETS_DEST}${filePath}`;
  const data = await Member.create({
    firstName,
    lastName,
    team,
    imageUrl,
  }).save();

  res.status(201).send({ data, status: "success" });
});

export { router };
