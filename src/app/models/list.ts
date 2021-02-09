import { Url } from "url";
import { User } from "./user";
import { Picture } from "./pictures";

export class List {
  _id: string;
  name: string;
  creationDate: string;
  modificationDate: String;
  user: number;
  picture: [number];
  public: boolean;
}
