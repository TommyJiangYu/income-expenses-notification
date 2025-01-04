import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Get('/:name')
  findUserByName(@Query('name') name: string) {
    return this.userService.findByName(name);
  }

  @Get('/:userLineId')
  findUserByLineId(@Query('userLineId') userLineId: string) {
    return this.userService.findByUserLineId(userLineId);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update({ id: Number(id), ...body });
  }
}
