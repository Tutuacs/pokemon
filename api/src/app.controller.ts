import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  home() {
    console.log("Back-home")
  }

}
