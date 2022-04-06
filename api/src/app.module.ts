import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingModule } from './api/tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
