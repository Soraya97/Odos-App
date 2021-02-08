import { Url } from "url";
import { User } from "./user";
import { Picture } from "./pictures";

export class List {
    name: string;
    creationDate: Date;
    modifiactionDate: Date;
    user: {type:"User"};
    picture: {type:"Picture"};
    public: boolean;
  }
