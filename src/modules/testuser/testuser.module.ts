import { Module } from '@nestjs/common';
import { TestuserService } from './testuser.service';

@Module({
  providers: [TestuserService]
})
export class TestuserModule {}
