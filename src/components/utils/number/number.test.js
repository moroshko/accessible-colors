import { expect } from 'chai';
import { isIntegerInRange } from './number';

describe('Number Utils', () => {
  describe('isIntegerInRange()', () => {
    describe('should return false if', () => {
      it('neither integer nor string integer', () => {
        expect(isIntegerInRange(null, 3, 7)).to.equal(false);
        expect(isIntegerInRange(undefined, 3, 7)).to.equal(false);
        expect(isIntegerInRange('', 3, 7)).to.equal(false);
        expect(isIntegerInRange('abc', 3, 7)).to.equal(false);
        expect(isIntegerInRange('5a', 3, 7)).to.equal(false);
        expect(isIntegerInRange('5.0', 3, 7)).to.equal(false);
        expect(isIntegerInRange('-5', -7, -3)).to.equal(false);
        expect(isIntegerInRange(-5, -7, -3)).to.equal(false);
        expect(isIntegerInRange(-5, 0)).to.equal(false);
      });

      it('integer not in range', () => {
        expect(isIntegerInRange(2, 3, 7)).to.equal(false);
        expect(isIntegerInRange(2, 3)).to.equal(false);
      });

      it('string integer not in range', () => {
        expect(isIntegerInRange('8', 3, 7)).to.equal(false);
        expect(isIntegerInRange('2', 3)).to.equal(false);
      });
    });

    describe('should return true if', () => {
      it('integer is in range', () => {
        expect(isIntegerInRange(5, 3, 7)).to.equal(true);
        expect(isIntegerInRange(3, 3)).to.equal(true);
      });

      it('string integer is in range', () => {
        expect(isIntegerInRange('7', 3, 7)).to.equal(true);
        expect(isIntegerInRange('7', 3)).to.equal(true);
      });
    });
  });
});
