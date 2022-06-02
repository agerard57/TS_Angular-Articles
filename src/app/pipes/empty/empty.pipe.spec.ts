import { EmptyPipe } from './empty.pipe';

describe('TruncatePipe', () => {
  let pipe: EmptyPipe;

  beforeEach(() => {
    pipe = new EmptyPipe();
  });

  it('Should return n/a', () => {
    expect(pipe.transform('')).toEqual('n/a');
  });

  it('Should return n/a', () => {
    expect(pipe.transform('   ')).toEqual('n/a');
  });
});