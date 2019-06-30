import { Test, TestingModule } from '@nestjs/testing';
import { BrewController } from './brew.controller';

describe('Brew Controller', () => {
  let controller: BrewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrewController],
    }).compile();

    controller = module.get<BrewController>(BrewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
