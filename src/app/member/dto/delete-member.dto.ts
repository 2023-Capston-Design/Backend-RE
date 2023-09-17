import { ApiProperty } from '@nestjs/swagger';
import { MemberEntity } from '@src/domain/member/member.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteMemberDto implements Partial<MemberEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;

  constructor(data: DeleteMemberDto) {
    Object.assign(this, data);
  }
}
