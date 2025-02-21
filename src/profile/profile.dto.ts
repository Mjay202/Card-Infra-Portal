import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { CurrencyType, Fee } from "src/common/types";

export class FeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsString()
  frequency: string;

  @IsNotEmpty()
  @IsString()
  account_pad: string;

  @IsNotEmpty()
  time: Date;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  fee_impact: string;

  @IsNotEmpty()
  account: number;
}

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  card_name: string;

  @IsNotEmpty()
  @IsNumber()
  bin_prefix: number;

  @IsNotEmpty()
  @IsNumber()
  expiration_in_month: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeeDto)
  fees: Fee[];

  @IsNotEmpty()
  @IsString()
  scheme_id: string;

  @IsNotEmpty()
  @IsString()
  branch_id: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  card_name?: string;

  @IsOptional()
  @IsNumber()
  bin_prefix?: number;

  @IsOptional()
  @IsNumber()
  expiration_in_month?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FeeDto)
  fees?: Fee[];

  @IsOptional()
  @IsString()
  scheme_id?: string;

  @IsOptional()
  @IsString()
  branch_id?: string;
}