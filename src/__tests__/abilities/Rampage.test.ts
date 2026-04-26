import { Rampage } from '../../abilities/Rampage';

describe('Rampage', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('onAttack', () => {
    it('activates and deals 2x damage when random < 0.75', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      const result = new Rampage().onAttack(20);
      expect(result.activated).toBe(true);
      expect(result.modifiedValue).toBe(40);
      expect(result.logMessage).toBeDefined();
    });

    it('does not activate when random >= 0.75', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.8);
      const result = new Rampage().onAttack(20);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(20);
    });
  });

  describe('onDefend', () => {
    it('activates and negates all damage when random < 0.65', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      const result = new Rampage().onDefend(20);
      expect(result.activated).toBe(true);
      expect(result.modifiedValue).toBe(0);
      expect(result.logMessage).toBeDefined();
    });

    it('does not activate when random >= 0.65', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.9);
      const result = new Rampage().onDefend(20);
      expect(result.activated).toBe(false);
      expect(result.modifiedValue).toBe(20);
    });
  });
});
