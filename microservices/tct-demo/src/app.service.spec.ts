import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { validate } from 'uuid';

describe('AppService', () => {
  let app: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    app = module.get<AppService>(AppService);
  });

  it('Trả về UUID', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4);
    const result = app.getRandomValue();
    expect(validate(result)).toBe(true);
  });

  it('Trả về null', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    const result = app.getRandomValue();
    expect(result).toBeNull();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
