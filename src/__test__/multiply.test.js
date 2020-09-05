import multiply from '../multiply';

it('test multiply', () => {
  expect(multiply(2, 3)).toBe(6);
  expect(multiply(-3, 3)).toBe(-9);
  expect(multiply(-3, 0)).toBe(0 || -0);
});
