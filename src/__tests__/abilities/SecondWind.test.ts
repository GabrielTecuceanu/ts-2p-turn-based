import { SecondWind } from '../../abilities/SecondWind';

describe('SecondWind', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('onDefend', () => {
    it('activates and negates all damage when random < 0.25', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      const result = new SecondWind().onDefend(20);
      expect(result.activated).toBe(true);
      expect(result.modifiedValue).toBe(0);
      expect(result.logMessage).toBeDefined();
    });

    it('does not activate when random >= 0.25', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      const result = new SecondWind().onDefend(20);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(20);
    });
  });

  describe('onAttack', () => {
    it('always passes through damage without activating', () => {
      const result = new SecondWind().onAttack(15);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(15);
    });
  });
});
