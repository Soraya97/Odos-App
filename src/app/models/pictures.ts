import { Url } from "url";
import { User } from "./user";

export class Picture {
  id: string;
  description: string;
  location: { type: "Point", coordinates: [number, number] };
  picture: string;
  creation_date: string;
  last_mod_date: string;
  userId: number;
}
