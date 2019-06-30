import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrewController } from './brew/brew.controller';
import { BrewService } from './brew/brew.service';

@Module({
  imports: [],
  controllers: [AppController, BrewController],
  providers: [AppService, BrewService],
})
export class AppModule {}
