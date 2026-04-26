import { Poke } from '../../abilities/Poke';

describe('Poke', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('onAttack', () => {
    it('activates and deals 2x damage when random < 0.05', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.03);
      const result = new Poke().onAttack(20);
      expect(result.activated).toBe(true);
      expect(result.modifiedValue).toBe(40);
      expect(result.logMessage).toBeDefined();
    });

    it('does not activate when random >= 0.05', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1);
      const result = new Poke().onAttack(20);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(20);
    });
  });

  describe('onDefend', () => {
    it('always passes through damage without activating', () => {
      const result = new Poke().onDefend(15);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(15);
    });
  });
});
