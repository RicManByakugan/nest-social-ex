import { IsNotEmpty, IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
