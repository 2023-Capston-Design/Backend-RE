import { SwaggerObject } from '@src/infrastructure/types';
import { StudentInterface } from './student.inteface';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StudentEntity } from '@src/domain/student/student.entity';
import { MEMBER_EXCEPTION_MSG } from '@src/infrastructure/exceptions';

export const StudentDocs: SwaggerObject<StudentInterface> = {
  Controller: applyDecorators(ApiTags('Student')),
  getStudentById: applyDecorators(
    ApiOperation({
      description: 'Student를 ID를 통해 검색합니다',
    }),
    ApiOkResponse({ type: StudentEntity }),
    ApiBadRequestResponse({ description: MEMBER_EXCEPTION_MSG.MemberNotFound }),
  ),
  getStudentByGid: applyDecorators(
    ApiOkResponse({ type: StudentEntity }),
    ApiBadRequestResponse({ description: MEMBER_EXCEPTION_MSG.MemberNotFound }),
  ),
};
