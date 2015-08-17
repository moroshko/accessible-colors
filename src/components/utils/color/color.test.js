import { expect } from 'chai';
import { findClosestAccessibleColor } from './color';

describe('Color Utils', () => {
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
