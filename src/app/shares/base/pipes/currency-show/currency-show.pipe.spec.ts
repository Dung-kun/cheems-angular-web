import { CurrencyShowPipe } from "./currency-show.pipe";

describe('CurrencyShowPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyShowPipe();
    expect(pipe).toBeTruthy();
  });
});
