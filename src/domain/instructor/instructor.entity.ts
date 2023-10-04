import { MemberEntity } from '@src/domain/member/member.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { DepartmentEntity } from '@domain/department/department.entity';
import { ClassImageEntiy } from '@domain/class-image/classimage.entity';
import { ClassEntity } from '@domain/class/class.entity';
import { member } from '@src/infrastructure/types';
import { ApiProperty } from '@nestjs/swagger';

@Entity('instructor')
export class InstructorEntity {
  @PrimaryColumn() // Should be member.groupId
  @ApiProperty()
  id: number;

  @Column({
    type: String,
  })
  @ApiProperty()
  groupId: string;
  /**
   * Circular Dependency Issue
   * https://github.com/typeorm/typeorm/issues/4526
   *
   */
  @ManyToOne(() => DepartmentEntity, (department) => department.instructors, {
    cascade: ['update', 'insert'],
  })
  @JoinColumn({
    name: 'department_id',
  })
  @ApiProperty()
  department: Relation<DepartmentEntity>;

  @OneToMany(() => ClassEntity, (cls) => cls.instructor)
  @ApiProperty()
  classes: Relation<ClassEntity>[];

  @OneToMany(() => ClassImageEntiy, (ci) => ci.instructor)
  @ApiProperty()
  images: Relation<ClassImageEntiy>[];

  @OneToOne(() => MemberEntity, (member) => member.instructorProfile)
  member: Relation<MemberEntity>;

  constructor(data: Partial<InstructorEntity>) {
    Object.assign(this, data);
  }
}
