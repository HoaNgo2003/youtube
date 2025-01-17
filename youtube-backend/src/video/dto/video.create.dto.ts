import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  image: string

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string
   
  
}