import { Character } from '../Character'
import { FixedAbilitySource } from '../abilities/AbilitySource'
import { Ability, AbilityActivation } from '../abilities/Ability'

const noopAbility: Ability = {
  name: 'Noop',
  onAttack(baseDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: baseDamage }
  },
  onDefend(incomingDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: incomingDamage }
  },
}

describe('Character', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('starts at full hp', () => {
    const c = new Character('Hero', 100, 20, new FixedAbilitySource(noopAbility))
    expect(c.hp).toBe(100)
    expect(c.isAlive).toBe(true)
  })

  it('takes damage correctly', () => {
    const c = new Character('Hero', 100, 20, new FixedAbilitySource(noopAbility))
    c.takeDamage(30)
    expect(c.hp).toBe(70)
    expect(c.isAlive).toBe(true)
  })

  it('hp does not go below 0', () => {
    const c = new Character('Hero', 100, 20, new FixedAbilitySource(noopAbility))
    c.takeDamage(200)
    expect(c.hp).toBe(0)
    expect(c.isAlive).toBe(false)
  })

  it('isAlive is false when hp reaches exactly 0', () => {
    const c = new Character('Hero', 100, 20, new FixedAbilitySource(noopAbility))
    c.takeDamage(100)
    expect(c.hp).toBe(0)
    expect(c.isAlive).toBe(false)
  })
})
