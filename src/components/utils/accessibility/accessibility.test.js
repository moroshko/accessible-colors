import { expect } from 'chai';
import { accessibleContrast } from './accessibility';

describe('Accessibility Utils', () => {
  describe('accessibleContrast()', () => {
    describe('AA', () => {
      it('should be 4.5 for normal scale', () => {
        expect(accessibleContrast('AA', 12, false)).to.equal(4.5);
        expect(accessibleContrast('AA', 17, false)).to.equal(4.5);
      });

      it('should be 3 for large scale', () => {
        expect(accessibleContrast('AA', 14, true)).to.equal(3);
        expect(accessibleContrast('AA', 18, false)).to.equal(3);
      });
    });

    describe('AAA', () => {
      it('should be 7 for normal scale', () => {
        expect(accessibleContrast('AAA', 12, false)).to.equal(7);
        expect(accessibleContrast('AAA', 17, false)).to.equal(7);
      });

      it('should be 4.5 for large scale', () => {
        expect(accessibleContrast('AAA', 14, true)).to.equal(4.5);
        expect(accessibleContrast('AAA', 18, false)).to.equal(4.5);
      });
    });
  });
});
