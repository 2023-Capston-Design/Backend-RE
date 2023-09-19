import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MemberEntity } from '@src/domain/member/member.entity';
import { CommonResponseDto } from '@src/infrastructure/common/common.response.dto';
import { member } from '@src/infrastructure/types';
import { Member } from '../authentication/Member.decorator';
import { JwtGuard } from '../authentication/jwt.guard';
import { AllowedMember } from '../authorization/allowed.guard';
import { Roles } from '../authorization/role.decorator';
import { GetUser } from './decorator/get-user.decorator';
import { CreateMemberDto } from './dto/create-member.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateMemberApprovalDto } from './dto/updateMemberApproval.dto';
import { MemberDocs } from './member.docs';
import { CheckType, CheckTypeValidationPipe } from './member.enum';
import { MemberInterface } from './member.interface';
import { MemberService } from './member.service';

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
  @MemberDocs.createMember
  public async createMember(
    @Body() body: CreateMemberDto,
  ): Promise<MemberEntity> {
    return await this.memberService.createMember(body);
  }

  @Patch()
  @UseGuards(JwtGuard)
  @MemberDocs.updateMember
  public async updateMember(
    @Body() body: UpdateMemberDto,
    @Member() member: MemberEntity,
  ): Promise<MemberEntity> {
    return await this.memberService.updateMember(body, member);
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
