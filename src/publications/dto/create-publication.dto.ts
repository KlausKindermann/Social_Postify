import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsDate()
  date?: Date;
}
