import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSchemeDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNumber()
    pan_length: number;
}

export class UpdateSchemeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  pan_length?: number;
}