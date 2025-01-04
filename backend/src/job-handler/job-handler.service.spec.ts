import { Test, TestingModule } from '@nestjs/testing';
import { JobHandlerService } from './job-handler.service';

describe('JobHandlerService', () => {
  let service: JobHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobHandlerService],
    }).compile();

    service = module.get<JobHandlerService>(JobHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
