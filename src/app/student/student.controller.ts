import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentInterface } from './student.inteface';
import { StudentDocs } from './student.docs';

@Controller('student')
@StudentDocs.Controller
export class StudentController implements StudentInterface {
  constructor(private readonly studentService: StudentService) {}

  @Get('/:id')
  @StudentDocs.getStudentById
  public async getStudentById(@Param('id', ParseIntPipe) id: number) {
    return await this.studentService.getStudentById(id);
  }

  @Get('/gid/:gid')
  @StudentDocs.getStudentByGid
  public async getStudentByGid(@Param('gid') gid: string) {
    return await this.studentService.getStudentByGid(gid);
  }
}
