import { CommonReturnType } from '@src/infrastructure/types';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberEntity } from '@src/domain/member/member.entity';
import { CheckType } from './member.enum';
import { UpdateMemberApprovalDto } from './dto/updateMemberApproval.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';

export interface MemberInterface {
  getAllMembers(page: number, pagesize: number): CommonReturnType;
  getMemberById(id: number): CommonReturnType;
  getMemberByGroupId(groupdId: string): CommonReturnType;
  createMember(
    body: CreateMemberDto,
    profileImage?: Express.Multer.File,
  ): CommonReturnType;
  updateMember(
    body: UpdateMemberDto,
    member: MemberEntity,
    file?: Express.Multer.File,
  ): CommonReturnType;
  checkValueIsAvailable(tp: CheckType, val: string): CommonReturnType;
  getMemberApproval(id: number): CommonReturnType;
  updateMemberApproval(
    member: MemberEntity,
    body: UpdateMemberApprovalDto,
  ): CommonReturnType;
  deleteMember(
    uid: number,
    body: DeleteMemberDto,
    member: MemberEntity,
  ): CommonReturnType;
}
