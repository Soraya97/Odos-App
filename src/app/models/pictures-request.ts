export class PictureRequest {
  description: string;
  location: {type: "Point", coordinates: [number, number]};
  picture: string;
}
