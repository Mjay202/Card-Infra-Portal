import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CardRequestStatus, CurrencyType } from "src/common/types";

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  branch_name: string;

  @IsNotEmpty()
  @IsString()
  initiator: string;

  @IsNotEmpty()
  @IsString()
  card_type: string;

  @IsNotEmpty()
  @IsNumber()
  card_charges: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  batch: number;

@IsOptional()
  @IsString()
  currency: CurrencyType;

}

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  branch_name?: string;

  @IsOptional()
  @IsString()
  initiator?: string;

  @IsOptional()
  @IsString()
  card_type?: string;

  @IsOptional()
  @IsNumber()
  card_charges?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  batch?: number;

  @IsOptional()
  @IsString()
  currency?: CurrencyType;

}