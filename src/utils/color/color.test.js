import { expect } from 'chai';
import { isValueValid, findClosestAccessibleColor } from './color';

describe('Color Utils', () => {
  describe('isValueValid()', () => {
    describe('should return true for', () => {
      it('6 digit hex color with hash', () => {
        expect(isValueValid('#716abc')).to.equal(true);
      });

      it('6 digit hex color without hash', () => {
        expect(isValueValid('716abc')).to.equal(true);
      });

      it('3 digit hex color with hash', () => {
        expect(isValueValid('#16c')).to.equal(true);
      });

      it('3 digit hex color without hash', () => {
        expect(isValueValid('16c')).to.equal(true);
      });

      it('valid color with whitespaces at the beginning or the end', () => {
        expect(isValueValid(' #16c908  ')).to.equal(true);
        expect(isValueValid('\t16c \n')).to.equal(true);
      });
    });

    describe('should return false for', () => {
      it('invalid colors', () => {
        expect(isValueValid('')).to.equal(false);
        expect(isValueValid('#12345G')).to.equal(false);
        expect(isValueValid('1234')).to.equal(false);
        expect(isValueValid('hello')).to.equal(false);
      });
    });
  });

  describe('findClosestAccessibleColor()', () => {
    it('should find accessible darker color', () => {
      expect(findClosestAccessibleColor('#0aa954', '#81920f', 4.5)).to.equal('#022a15');
    });

    it('should find accessible lighter color', () => {
      expect(findClosestAccessibleColor('#000934', '#001923', 4.5)).to.equal('#5572ff');
    });

    it('should find the closest accessible color', () => {
      expect(findClosestAccessibleColor('#a8a8a8', '#0b890b', 4.5)).to.equal('#fefefe');
      expect(findClosestAccessibleColor('#757575', '#0b890b', 4.5)).to.equal('#030303');
    });
  });
});
