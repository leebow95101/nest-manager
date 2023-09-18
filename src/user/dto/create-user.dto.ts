import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @IsEmail({},{ message: '邮箱格式错误' })
  readonly email?: string;

  @IsString({ message: '角色格式错误' })
  readonly role?: string;

  @IsString({ message: '头像格式错误' })
  readonly avatar?: string;

  @IsString({ message: '时间格式不正确' })
  readonly registered_time?: string;
}
