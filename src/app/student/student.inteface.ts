import { CommonReturnType } from '@src/infrastructure/types';

export interface StudentInterface {
  getStudentById(id: number): CommonReturnType;
  getStudentByGid(gid: string): CommonReturnType;
}
