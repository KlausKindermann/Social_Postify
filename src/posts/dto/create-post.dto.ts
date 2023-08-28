import { IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  tittle: string;

  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  text: string;

  @IsUrl()
  image: string;
}
