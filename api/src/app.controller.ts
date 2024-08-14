import { Controller, Get } from '@nestjs/common';

@Controller('roll')
export class AppController {

  @Get()
  home() {
    console.log("Back-home")
  }

}
