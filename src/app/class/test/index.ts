import { ClassImageEntiy } from '@src/domain/class-image/classimage.entity';
import { DepartmentEntity } from '@src/domain/department/department.entity';
import { InstructorEntity } from '@src/domain/instructor/instructor.entity';
import { MemberEntity } from '@src/domain/member/member.entity';
import { member } from '@src/infrastructure/types';

export const exampleDepartmentEntity: DepartmentEntity = {
  name: 'DSC',
  phoneNumber: '123456789',
  url: 'www.google.com',
} as DepartmentEntity;

export const exampleDepartmentEntity2: DepartmentEntity = {
  name: 'Game SW',
  phoneNumber: '1234567',
  url: 'www.naver.com',
} as DepartmentEntity;

export const exampleDepartmentEntity3: DepartmentEntity = {
  name: 'Chemistry',
  phoneNumber: '1234567',
  url: 'www.daum.net',
} as DepartmentEntity;

export const exampleInstructorEntity: MemberEntity = {
  name: 'KBS',
  password: 'password',
  email: 'email@naver.com',
  groupId: 'a1234',
  sex: member.Sex.MALE,
  approved: member.Approve.APPROVE,
  approvedReason: 'test',
  emailConfirmed: true,
  birth: new Date(),
  memberRole: member.Role.INSTRUCTOR,
} as MemberEntity;

export const exampleInstructorEntity2: MemberEntity = {
  name: 'esj',
  password: 'password',
  email: 'a@google.com',
  groupId: 'a324',
  sex: member.Sex.MALE,
  approved: member.Approve.APPROVE,
  approvedReason: 'test',
  emailConfirmed: true,
  birth: new Date(),
  memberRole: member.Role.INSTRUCTOR,
} as MemberEntity;

export const exampleStudent1Entity: MemberEntity = {
  name: 'hoplin',
  password: 'password',
  email: 'jhoplin7259@gmail.com',
  groupId: 'b889047',
  sex: member.Sex.MALE,
  approved: member.Approve.APPROVE,
  approvedReason: 'test',
  emailConfirmed: true,
  birth: new Date(),
  memberRole: member.Role.STUDENT,
} as MemberEntity;

export const exampleStudent2Entity: MemberEntity = {
  name: 'KJH',
  password: 'password',
  email: 'kjh@naver.com',
  groupId: 'b889005',
  sex: member.Sex.MALE,
  approved: member.Approve.APPROVE,
  approvedReason: 'test',
  emailConfirmed: true,
  birth: new Date(),
  memberRole: member.Role.STUDENT,
} as MemberEntity;

export const exampleStudent3Entity: MemberEntity = {
  name: 'LJH',
  password: 'password',
  email: 'ljh1127@daum.net',
  groupId: 'b889052',
  sex: member.Sex.MALE,
  approved: member.Approve.APPROVE,
  approvedReason: 'test',
  emailConfirmed: true,
  birth: new Date(),
  memberRole: member.Role.STUDENT,
} as MemberEntity;
