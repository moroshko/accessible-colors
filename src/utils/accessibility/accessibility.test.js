import { expect } from 'chai';
import { accessibleContrast, fontSizeInPx } from './accessibility';

describe('Accessibility Utils', () => {
  describe('accessibleContrast()', () => {
    describe('AA', () => {
      it('should be 4.5 for normal scale', () => {
        expect(accessibleContrast('AA', 12, 'pt', false)).to.equal(4.5);
        expect(accessibleContrast('AA', 17, 'pt', false)).to.equal(4.5);
        expect(accessibleContrast('AA', 14, 'px', false)).to.equal(4.5);
        expect(accessibleContrast('AA', 23, 'px', false)).to.equal(4.5);
      });

      it('should be 3 for large scale', () => {
        expect(accessibleContrast('AA', 14, 'pt', true)).to.equal(3);
        expect(accessibleContrast('AA', 18, 'pt', false)).to.equal(3);
        expect(accessibleContrast('AA', 18, 'pt', true)).to.equal(3);
        expect(accessibleContrast('AA', 24, 'pt', false)).to.equal(3);
        expect(accessibleContrast('AA', 19, 'px', true)).to.equal(3);
      });
    });

    describe('AAA', () => {
      it('should be 7 for normal scale', () => {
        expect(accessibleContrast('AAA', 12, 'pt', false)).to.equal(7);
        expect(accessibleContrast('AAA', 17, 'pt', false)).to.equal(7);
        expect(accessibleContrast('AAA', 14, 'px', false)).to.equal(7);
        expect(accessibleContrast('AAA', 23, 'px', false)).to.equal(7);
      });

      it('should be 4.5 for large scale', () => {
        expect(accessibleContrast('AAA', 14, 'pt', true)).to.equal(4.5);
        expect(accessibleContrast('AAA', 18, 'pt', false)).to.equal(4.5);
        expect(accessibleContrast('AAA', 19, 'px', true)).to.equal(4.5);
        expect(accessibleContrast('AAA', 24, 'px', false)).to.equal(4.5);
      });
    });
  });

  describe('fontSizeInPx()', () => {
    it('Should round down', () => {
      expect(fontSizeInPx(10, 'pt')).to.equal(13);
      expect(fontSizeInPx(18, 'pt')).to.equal(23);
    });

    it('Should return number unchanged', () => {
      expect(fontSizeInPx(10, 'px')).to.equal(10);
    });
  });
});
