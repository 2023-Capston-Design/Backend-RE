import { ApiProperty } from '@nestjs/swagger';
import { MemberEntity } from '@src/domain/member/member.entity';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMemberDto implements Partial<MemberEntity> {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  changedpassword?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  originalpassword!: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  birth?: Date;

  constructor(data: UpdateMemberDto) {
    Object.assign(this, data);
  }
}
