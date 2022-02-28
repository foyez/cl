import multer from "multer";
import { extname, resolve } from "path";
import { mkdir } from "fs/promises";
import { ASSETS_DEST } from "../utils/constants";

const dest = resolve(process.cwd(), `${ASSETS_DEST}/images`);

const diskStorage = multer.diskStorage({
  destination: async (_req, file, done) => {
    await mkdir(dest, { recursive: true });
    if (!file) return done(new Error("Upload file error"), dest);
    return done(null, dest);
  },
  filename: (_req, file, done) => {
    if (file) {
      const imagePattern = /(jpg|jpeg|png|gif|svg)/gi;
      const imgExt = extname(file.originalname).replace(".", "");

      if (!imagePattern.test(imgExt)) {
        return new TypeError("File format is not valid");
      }

      return done(null, file.originalname);
    }
  },
});

// const limits = 100000; // 10 MB
export const uploadImage = multer({
  storage: diskStorage,
  // limits: { fileSize: limits },
});
