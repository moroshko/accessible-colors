import { expect } from 'chai';
import { isIntegerInRange, correctInteger } from './number';

describe('Number Utils', () => {
  describe('isIntegerInRange()', () => {
    describe('should return true for', () => {
      it('string integer in range', () => {
        expect(isIntegerInRange('7', 3, 7)).to.equal(true);
        expect(isIntegerInRange('7', 3)).to.equal(true);
      });

      it('string integer in range with whitespaces at the beginning or the end', () => {
        expect(isIntegerInRange(' 7\n', 3, 7)).to.equal(true);
        expect(isIntegerInRange(' \t\t7  \n', 3)).to.equal(true);
      });
    });

    describe('should return false for', () => {
      it('string integer not in range', () => {
        expect(isIntegerInRange('8', 3, 7)).to.equal(false);
        expect(isIntegerInRange('2', 3)).to.equal(false);
      });

      it('not a string integer', () => {
        expect(isIntegerInRange(null, 3, 7)).to.equal(false);
        expect(isIntegerInRange(undefined, 3, 7)).to.equal(false);
        expect(isIntegerInRange('', 3, 7)).to.equal(false);
        expect(isIntegerInRange('abc', 3, 7)).to.equal(false);
        expect(isIntegerInRange('5a', 3, 7)).to.equal(false);
        expect(isIntegerInRange('5.0', 3, 7)).to.equal(false);
        expect(isIntegerInRange('-5', -7, -3)).to.equal(false);
        expect(isIntegerInRange(-5, -7, -3)).to.equal(false);
        expect(isIntegerInRange(-5, 0)).to.equal(false);
        expect(isIntegerInRange(5, 3, 7)).to.equal(false);
        expect(isIntegerInRange(3, 3)).to.equal(false);
      });
    });
  });

  describe('correctInteger()', () => {
    it('should trim whitespaces', () => {
      expect(correctInteger('  19\t\n')).to.equal('19');
    });

    it('should remove leading zeros', () => {
      expect(correctInteger('016')).to.equal('16');
      expect(correctInteger('0000090')).to.equal('90');
    });
  });
});
