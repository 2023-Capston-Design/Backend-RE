import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
  constructor(data: DeleteImageDto) {
    Object.assign(this, data);
  }
}
