import {
  Module,
  NestModule,
} from '@nestjs/common';

import { UserModule } from './user.module';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    //
    // UserModule, 
    AdminModule
  ]
})
export class ApplicationModule {}
