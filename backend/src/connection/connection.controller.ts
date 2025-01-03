import { Controller, Get } from '@nestjs/common';

@Controller('connection')
export class ConnectionController {
  @Get('/test')
  testConnection() {
    return {
      success: true,
      message: 'Connection successful',
    };
  }
}
