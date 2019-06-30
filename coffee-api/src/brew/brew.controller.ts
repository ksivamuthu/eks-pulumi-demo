import { Controller, Get } from '@nestjs/common';
import { BrewService } from './brew.service';
import { Brew } from './brew.model';

@Controller('brew')
export class BrewController {
    constructor(private readonly brewService: BrewService) { }

    @Get()
    getHello(): Brew[] {
        return this.brewService.getAllBrews();
    }
}
