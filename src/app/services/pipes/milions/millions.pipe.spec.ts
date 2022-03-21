import { MillionsPipe } from './millions.pipe';

describe('MillionsPipe', () => {
  const pipe = new MillionsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

});
