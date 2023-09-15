import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
