import { PowerStrike } from '../../abilities/PowerStrike'

describe('PowerStrike', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('onAttack', () => {
    it('activates and deals 1.5x damage when random < 0.5', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.3)
      const result = new PowerStrike().onAttack(20)
      expect(result.activated).toBe(true)
      expect(result.modifiedValue).toBe(30)
      expect(result.logMessage).toBeDefined()
    })

    it('does not activate when random >= 0.5', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.7)
      const result = new PowerStrike().onAttack(20)
      expect(result.activated).toBe(false)
      expect(result.modifiedValue).toBe(20)
    })
  })

  describe('onDefend', () => {
    it('always passes through damage without activating', () => {
      const result = new PowerStrike().onDefend(15)
      expect(result.activated).toBe(false)
      expect(result.modifiedValue).toBe(15)
    })
  })
})
