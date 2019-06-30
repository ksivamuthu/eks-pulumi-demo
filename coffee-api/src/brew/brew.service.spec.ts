import { Test, TestingModule } from '@nestjs/testing';
import { BrewService } from './brew.service';

describe('BrewService', () => {
  let service: BrewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrewService],
    }).compile();

    service = module.get<BrewService>(BrewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
