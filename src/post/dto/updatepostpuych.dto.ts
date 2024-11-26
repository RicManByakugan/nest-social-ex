import { IsOptional, IsString } from 'class-validator';

export class updatePatchPostDto {
  @IsString()
  @IsOptional()
  readonly title: string;
  @IsString()
  @IsOptional()
  readonly body: string;
}
