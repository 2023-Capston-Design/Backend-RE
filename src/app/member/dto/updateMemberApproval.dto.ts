import { ApiProperty } from '@nestjs/swagger';
import { MemberEntity } from '@src/domain/member/member.entity';
import { member } from '@src/infrastructure/types';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMemberApprovalDto implements Partial<MemberEntity> {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    enum: member.Approve,
  })
  @IsNotEmpty()
  @IsEnum(member.Approve)
  approved!: member.Approve;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  approvedReason!: string;
}
