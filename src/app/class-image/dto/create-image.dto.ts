import { ApiProperty } from '@nestjs/swagger';
import { ClassImageEntiy } from '@src/domain/class-image/classimage.entity';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateImageDto implements Partial<ClassImageEntiy> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  instructor_id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  imageOptions: object;
}
