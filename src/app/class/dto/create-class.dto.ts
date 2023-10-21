import { ApiProperty } from '@nestjs/swagger';
import { ClassEntity } from '@src/domain/class/class.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassDto implements Partial<Omit<ClassEntity, 'id'>> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maximum_student: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  instructorId: number;

  constructor(data: CreateClassDto) {
    Object.assign(this, data);
  }
}
