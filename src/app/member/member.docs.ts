import { UnprocessableEntityException, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { MemberEntity } from '@src/domain/member/member.entity';
import { CommonResponseDto } from '@src/infrastructure/common/common.response.dto';
import {
  AUTH_EXCEPTION_MSG,
  DEPARTMENT_EXCEPTION_MSG,
  MEMBER_EXCEPTION_MSG,
} from '@src/infrastructure/exceptions';
import { SwaggerObject } from '@src/infrastructure/types';
import { MemberInterface } from './member.interface';

export const MemberDocs: SwaggerObject<MemberInterface> = {
  Controller: applyDecorators(ApiTags('Member')),
  getAllMembers: applyDecorators(
    ApiOperation({
      summary: '모든 회원의 정보를 가져옵니다.',
    }),
    ApiOkResponse({
      type: MemberEntity,
      isArray: true,
    }),
  ),
  getMemberById: applyDecorators(
    ApiOperation({
      summary: '회원 정보를 id를 통해 조회합니다. 로그인이 요구됩니다.',
    }),
    ApiOkResponse({
      type: MemberEntity,
    }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
    ApiBearerAuth(),
  ),
  getMemberByGroupId: applyDecorators(
    ApiOperation({
      summary: '회원 정보를 Group ID를 통해 조회합니다. 로그인이 요구됩니다.',
      description: 'Group ID는 학생, 교직원의 고유 ID를 의미합니다',
    }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
    ApiBearerAuth(),
  ),
  createMember: applyDecorators(
    ApiOperation({
      summary: '회원가입을 진행합니다.',
      description:
        '비밀번호는 Bcrypt를 사용해 단방향 암호화합니다. Datetime Format은 `YYYY-MM-DD`로 통일해주시기 바랍니다.',
    }),
    ApiOkResponse({ type: MemberEntity }),
    ApiUnprocessableEntityResponse({
      description: new UnprocessableEntityException().message,
    }),
    ApiBadRequestResponse({
      description: [
        DEPARTMENT_EXCEPTION_MSG.DepartmentNotFound,
        MEMBER_EXCEPTION_MSG.GroupIDAlreadyTaken,
        MEMBER_EXCEPTION_MSG.DepartmentIdNotGiven,
      ].join(', '),
    }),
  ),
  updateMember: applyDecorators(
    ApiOperation({
      summary: '회원 정보를 수정합니다. 로그인이 요구됩니다.',
      description:
        '이름, 비밀번호, 생일 정보만 변경 가능합니다. 회원정보 변경을 위해서는 비밀번호 입력이 필수입니다.',
    }),
    ApiOkResponse({ type: MemberEntity }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
    ApiUnauthorizedResponse({
      description: AUTH_EXCEPTION_MSG.PasswordUnmatched,
    }),
    ApiBearerAuth(),
  ),
  checkValueIsAvailable: applyDecorators(
    ApiOperation({
      summary: '회원 정보값의 중복값이 있는지 확인합니다',
      description: "type의 값은 'email' 혹은 'gid'가 되어야 합니다.",
    }),
    ApiOkResponse({ type: CommonResponseDto }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.UnsupportedCheckType,
    }),
  ),

  getMemberApproval: applyDecorators(
    ApiOperation({
      summary: '회원 계정 상태를 조회합니다',
    }),
    ApiOkResponse({ type: CommonResponseDto }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
  ),

  updateMemberApproval: applyDecorators(
    ApiOperation({
      summary: '회원 계정 상태를 변경합니다. Manager 권한이 요구됩니다.',
      description:
        '상태 변경시, 변경 사유를 필수로 입력해야합니다. ex) 계정 정지시 정지사유',
    }),
    ApiOkResponse({ type: CommonResponseDto }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
    ApiBearerAuth(),
  ),

  deleteMember: applyDecorators(
    ApiOperation({
      summary: '회원을 탈퇴합니다. 로그인이 요구됩니다.',
      description: '탈퇴시 비밀번호 확인이 진행됩니다.',
    }),
    ApiOkResponse({ type: CommonResponseDto }),
    ApiBadRequestResponse({
      description: MEMBER_EXCEPTION_MSG.MemberNotFound,
    }),
    ApiUnauthorizedResponse({
      description: AUTH_EXCEPTION_MSG.PasswordUnmatched,
    }),
    ApiBearerAuth(),
  ),
};
