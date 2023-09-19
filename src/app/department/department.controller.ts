import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UnprocessableEntityException,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { DepartmentEntity } from '@src/domain/department/department.entity';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageLocalDiskOption } from '@src/infrastructure/multer';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DEPARTMENT_EXCEPTION_MSG } from '@src/infrastructure/exceptions';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CommonResponseDto } from '@src/infrastructure/common/common.response.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { AllowedMember } from '../authorization/allowed.guard';
import { JwtGuard } from '../authentication/jwt.guard';
import { Roles } from '../authorization/role.decorator';
import { member } from '@src/infrastructure/types';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get('/')
  @ApiOperation({
    summary: '모든 학부(혹은 부서) 정보를 가져옵니다',
    description:
      '소속 교직원, 학생을 가져오기 위해서는 detail을 true로 해주어야합니다.',
  })
  @ApiOkResponse({
    type: DepartmentEntity,
    isArray: true,
  })
  public async getAllDepartments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pagesize', new DefaultValuePipe(10), ParseIntPipe) pagesize: number,
  ): Promise<DepartmentEntity[]> {
    return await this.departmentService.getAllDepartments(page, pagesize);
  }

  @Get('/id/:id')
  @ApiOperation({
    summary: 'ID를 통해 학부 정보를 가져옵니다.',
    description:
      '소속 교직원, 학생을 가져오기 위해서는 detail을 true로 해주어야합니다.',
  })
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiBadRequestResponse({
    description: DEPARTMENT_EXCEPTION_MSG.DepartmentNotFound,
  })
  public async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
    @Query('detail', new DefaultValuePipe(false)) detail?: boolean,
  ): Promise<DepartmentEntity> {
    return await this.departmentService.getDepartmentById(id, detail);
  }

  @Get('/name/:name')
  @ApiOperation({ summary: '학부 이름 중복 체크' })
  @ApiOkResponse({ type: CommonResponseDto })
  @ApiBadRequestResponse({
    description: DEPARTMENT_EXCEPTION_MSG.DepartmentNameAlreadyTaken,
  })
  public async checkDepartmentNameTaken(@Param('name') name: string) {
    const result = new CommonResponseDto(
      await this.departmentService.checkDepartmentNameTaken(name),
    );
    return result;
  }

  @Post('/')
  @ApiOperation({
    summary: '새 학부(혹은 부서)를 생성합니다. Manager 권한이 요구됩니다',
  })
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiUnprocessableEntityResponse({
    description: new UnprocessableEntityException().message,
  })
  @ApiBadRequestResponse({
    description: DEPARTMENT_EXCEPTION_MSG.DepartmentNameAlreadyTaken,
  })
  @ApiBearerAuth()
  @UseGuards(AllowedMember)
  @UseGuards(JwtGuard)
  @Roles(member.Role.MANAGER)
  public async createDepartment(
    @Body() body: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    return await this.departmentService.createDepartment(body);
  }

  @Patch('/')
  @ApiOperation({
    summary: '학부 정보를 수정합니다. Manager 권한이 요구됩니다',
  })
  @UseInterceptors(
    FileInterceptor(
      'profile',
      imageLocalDiskOption(`${__dirname}/../../../department_profile`),
    ),
  )
  @ApiOkResponse({ type: DepartmentEntity })
  @ApiBadRequestResponse({
    description: DEPARTMENT_EXCEPTION_MSG.DepartmentNameAlreadyTaken,
  })
  @ApiBearerAuth()
  @UseGuards(AllowedMember)
  @UseGuards(JwtGuard)
  @Roles(member.Role.MANAGER)
  public async updateDepartment(
    @Body() body: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    return this.departmentService.updateDepartment(body);
  }

  @Delete('/')
  @ApiOperation({
    summary: '학부를 삭제합니다. Manager 권한이 요구됩니다',
  })
  @ApiOkResponse({ type: CommonResponseDto })
  @ApiBearerAuth()
  @UseGuards(AllowedMember)
  @UseGuards(JwtGuard)
  @Roles(member.Role.MANAGER)
  public async deleteDepartment(@Body() body: DeleteDepartmentDto) {
    return new CommonResponseDto(
      await this.departmentService.deleteDepartment(body),
    );
  }
}
