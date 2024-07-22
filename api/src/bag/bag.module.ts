import { Module } from '@nestjs/common';
import { BagService } from './bag.service';
import { BagController } from './bag.controller';

@Module({
  controllers: [BagController],
  providers: [BagService],
})
export class BagModule {}
