// import { Url } from "url";
// import { User } from "./user";

export class Picture {
  id: string;
  description: string;
  location: { type: "Point", coordinates: [number, number] };
  picture: string;
  creation_date: string;
  last_mod_date: string;
  userId: { _id: string, username: string, email: string, registrationDate: string};
}