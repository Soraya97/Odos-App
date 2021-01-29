import { Url } from "url";

export class Picture {
  _id: string;
  description: string;
  location: String;
  coordinates: [number, number];
  picture: String;
  creation_date: Date = new Date();  
  last_mod_date: String;
  userId: number;
}
