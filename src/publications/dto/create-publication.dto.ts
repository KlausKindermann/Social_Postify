import { IsDateString, IsPositive } from "class-validator";

export class CreatePublicationDto {

  @IsPositive()
  //@IsInt
  mediaId: number;

  @IsPositive()
  //@IsInt
  postId: number;

  @IsDateString()
  date: string;

  constructor(params?: Partial<CreatePublicationDto>) {
    Object.assign(this, params);
  }

}
