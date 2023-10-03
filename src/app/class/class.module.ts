import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from '@src/domain/class/class.entity';
import { LoggerModule } from '@hoplin/nestjs-logger';
import { InstructorModule } from '../instructor/instructor.module';
import { DepartmentModule } from '../department/department.module';
import { ClassImageModule } from '../class-image/class-image.module';
import { MemberModule } from '../member/member.module';
import { ClassStudentEntity } from '@src/domain/class_student/class-student.entity';

@Module({
  imports: [
    LoggerModule.forFeature(),
    TypeOrmModule.forFeature([ClassEntity, ClassStudentEntity]),
    MemberModule,
    DepartmentModule,
    ClassImageModule,
    InstructorModule,
  ],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
