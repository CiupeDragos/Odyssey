import bcrypt from "bcrypt";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export function isRequestValid(requestObject: Object): boolean {
  const requestPropertiesTypes = Object.values(requestObject).map(
    (v) => typeof v
  );

  return !requestPropertiesTypes.includes("undefined");
}

export async function encryptPassword(
  plainTextPassword: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(plainTextPassword, salt);
}

export async function decryptPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

export function writePhotosFromBase64(
  base64Images: Array<string>,
  baseFilePath: string
) {
  const images = new Array<string>();

  base64Images.forEach((base64Img) => {
    const dataWithoutPrefix = base64Img.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(dataWithoutPrefix, "base64");

    const photoId = `${uuidv4()}.jpg`;
    const curFilePath = `${baseFilePath}/${photoId}`;

    images.push(photoId);

    fs.writeFile(curFilePath, buffer, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Image saved successfully!");
      }
    });
  });

  return images;
}

export function getYearsFromTimestamp(timestamp: string | number): number {
  const intTimestamp =
    typeof timestamp === "string" ? parseInt(timestamp) : timestamp;

  const currentTimestamp = new Date().getTime();
  const differenceMs = currentTimestamp - intTimestamp;

  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const age = differenceMs / millisecondsPerYear;

  return Math.floor(age);
}
