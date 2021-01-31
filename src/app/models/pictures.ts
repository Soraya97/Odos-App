import { Url } from "url";

export class Picture {
  _id: string;
  description: string;
  location: string;
  coordinates: [number, number];
  picture: string;
  creation_date: Date = new Date();
  last_mod_date: string;
  userId: number;
}
