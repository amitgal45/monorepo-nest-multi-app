import { IsEmail, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendTemplatedEmailDto {
  @IsEmail()
  @ApiProperty()
  to: string;

  @IsString()
  @ApiProperty()
  templateId: string;

  @IsObject()
  @ApiProperty()
  templateData: Record<string, any>;
}
