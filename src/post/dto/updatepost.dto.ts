import { IsNotEmpty, IsString } from 'class-validator';

export class updatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
