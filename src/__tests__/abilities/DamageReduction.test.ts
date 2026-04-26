import { DamageReduction } from '../../abilities/DamageReduction';

describe('DamageReduction', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('onDefend', () => {
    it('activates and halves damage when random < 0.5', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.3);
      const result = new DamageReduction().onDefend(20);
      expect(result.activated).toBe(true);
      expect(result.modifiedValue).toBe(10);
      expect(result.logMessage).toBeDefined();
    });

    it('does not activate when random >= 0.5', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.7);
      const result = new DamageReduction().onDefend(20);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(20);
    });
  });

  describe('onAttack', () => {
    it('always passes through damage without activating', () => {
      const result = new DamageReduction().onAttack(15);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(15);
    });
  });
});
