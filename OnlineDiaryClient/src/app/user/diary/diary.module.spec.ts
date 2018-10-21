import { DiaryModule } from './diary.module';

describe('DiaryModule', () => {
  let diaryModule: DiaryModule;

  beforeEach(() => {
    diaryModule = new DiaryModule();
  });

  it('should create an instance', () => {
    expect(diaryModule).toBeTruthy();
  });
});
