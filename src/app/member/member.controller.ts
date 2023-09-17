import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberEntity } from '@src/domain/member/member.entity';
import { CommonResponseDto } from '@src/infrastructure/common/common.response.dto';
import { imageLocalDiskOption } from '@src/infrastructure/multer';
import { member } from '@src/infrastructure/types';
import { Member } from '../authentication/Member.decorator';
import { JwtGuard } from '../authentication/jwt.guard';
import { AllowedMember } from '../authorization/allowed.guard';
import { Roles } from '../authorization/role.decorator';
import { CreateMemberDto } from './dto/create-member.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateMemberApprovalDto } from './dto/updateMemberApproval.dto';
import { CheckType, CheckTypeValidationPipe } from './member.enum';
import { MemberInterface } from './member.interface';
import { MemberService } from './member.service';
import { MemberDocs } from './member.docs';
import { GetUser } from './decorator/get-user.decorator';

@Controller('member')
@MemberDocs.Controller
export class MemberController implements MemberInterface {
  constructor(private readonly memberService: MemberService) {}

  @Get('/')
  @MemberDocs.getAllMembers
  public async getAllMembers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pagesize', new DefaultValuePipe(10), ParseIntPipe) pagesize: number,
  ): Promise<MemberEntity[]> {
    return await this.memberService.getAllMembers(page, pagesize);
  }

  @Get('/id/:id')
  @UseGuards(JwtGuard)
  @MemberDocs.getMemberById
  public async getMemberById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MemberEntity> {
    return await this.memberService.getMemberById(id);
  }

  @Get('/gid/:groupId')
  @UseGuards(JwtGuard)
  @MemberDocs.getMemberByGroupId
  public async getMemberByGroupId(
    @Param('groupId') groupId: string,
  ): Promise<MemberEntity> {
    return await this.memberService.getMemberByGroupId(groupId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'profile',
      imageLocalDiskOption(`${__dirname}/../../../profiles`),
    ),
  )
  @MemberDocs.createMember
  public async createMember(
    @Body() body: CreateMemberDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(jpg|png)$',
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    profileImage?: Express.Multer.File,
  ): Promise<MemberEntity> {
    return await this.memberService.createMember(body, profileImage);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor(
      'profile',
      imageLocalDiskOption(`${__dirname}/../../../profiles`),
    ),
  )
  @MemberDocs.updateMember
  public async updateMember(
    @Body() body: UpdateMemberDto,
    @Member() member: MemberEntity,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(jpg|png)$',
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file?: Express.Multer.File,
  ): Promise<MemberEntity> {
    return await this.memberService.updateMember(body, member, file);
  }

  @Get('/check/:type/:value')
  @MemberDocs.checkValueIsAvailable
  public async checkValueIsAvailable(
    @Param('type', CheckTypeValidationPipe) tp: CheckType,
    @Param('value') val: string,
  ) {
    const result = new CommonResponseDto(
      await this.memberService.checkValueIsAvailable(tp, val),
    );
    return result;
  }

  @Get('/approval/:id')
  @MemberDocs.getMemberApproval
  public async getMemberApproval(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommonResponseDto> {
    return new CommonResponseDto(
      await this.memberService.getMemberApproval(id),
    );
  }

  @Patch('/approval')
  @UseGuards(AllowedMember)
  @UseGuards(JwtGuard)
  @Roles(member.Role.MANAGER)
  @MemberDocs.updateMemberApproval
  public async updateMemberApproval(
    @Member() member: MemberEntity,
    @Body() body: UpdateMemberApprovalDto,
  ): Promise<CommonResponseDto> {
    return new CommonResponseDto(
      await this.memberService.updateMemberApproval(member, body),
    );
  }

  @Delete()
  @UseGuards(JwtGuard)
  @MemberDocs.deleteMember
  public async deleteMember(
    @GetUser('id') uid: number,
    @Body() body: DeleteMemberDto,
    @Member() member: MemberEntity,
  ): Promise<CommonResponseDto> {
    return new CommonResponseDto(
      await this.memberService.deleteMember(uid, body, member),
    );
  }
}
