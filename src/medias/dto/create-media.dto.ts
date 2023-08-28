import { IsNotEmpty, IsString} from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  tittle: string;

  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;
}