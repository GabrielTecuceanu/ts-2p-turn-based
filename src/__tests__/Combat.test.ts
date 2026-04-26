import { Character } from '../Character'
import { Combat } from '../Combat'
import { FixedAbilitySource } from '../abilities/AbilitySource'
import { Ability, AbilityActivation } from '../abilities/Ability'
import { CapturingLogger } from './helpers/Logger.test-utils'

const noopAbility: Ability = {
  name: 'Noop',
  onAttack(baseDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: baseDamage }
  },
  onDefend(incomingDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: incomingDamage }
  },
}

function makeChar(name: string, hp: number, damage: number, ability = noopAbility): Character {
  return new Character(name, hp, damage, new FixedAbilitySource(ability))
}

describe('Combat', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns the surviving character as winner', () => {
    const a = makeChar('A', 100, 10)
    const b = makeChar('B', 50, 10)
    const winner = new Combat(a, b, new CapturingLogger()).run()
    expect(winner).toBe(a)
    expect(b.hp).toBe(0)
    expect(a.hp).toBe(50)
  })

  it('returns null when both characters die simultaneously', () => {
    const a = makeChar('A', 10, 10)
    const b = makeChar('B', 10, 10)
    const winner = new Combat(a, b, new CapturingLogger()).run()
    expect(winner).toBeNull()
    expect(a.hp).toBe(0)
    expect(b.hp).toBe(0)
  })

  it('applies onAttack ability modifier', () => {
    const doubleHit: Ability = {
      name: 'DoubleHit',
      onAttack(baseDamage: number): AbilityActivation {
        return { activated: true, modifiedValue: baseDamage * 2 }
      },
      onDefend(incomingDamage: number): AbilityActivation {
        return { activated: false, modifiedValue: incomingDamage }
      },
    }

    const a = makeChar('A', 100, 10, doubleHit)
    const b = makeChar('B', 100, 10)
    new Combat(a, b, new CapturingLogger()).runRound()
    expect(b.hp).toBe(80)
    expect(a.hp).toBe(90)
  })

  it('applies onDefend ability modifier', () => {
    const blockAll: Ability = {
      name: 'BlockAll',
      onAttack(baseDamage: number): AbilityActivation {
        return { activated: false, modifiedValue: baseDamage }
      },
      onDefend(_incomingDamage: number): AbilityActivation {
        return { activated: true, modifiedValue: 0 }
      },
    }

    const a = makeChar('A', 100, 10)
    const b = makeChar('B', 100, 10, blockAll)
    new Combat(a, b, new CapturingLogger()).runRound()
    expect(b.hp).toBe(100)
    expect(a.hp).toBe(90)
  })

  it('logs round number and winner', () => {
    const logger = new CapturingLogger()
    const a = makeChar('A', 100, 10)
    const b = makeChar('B', 10, 10)
    new Combat(a, b, logger).run()
    expect(logger.messages.some(m => m.includes('Round 1'))).toBe(true)
    expect(logger.messages.some(m => m.includes('A wins'))).toBe(true)
  })

  it('logs draw when both characters die simultaneously', () => {
    const logger = new CapturingLogger()
    new Combat(makeChar('A', 10, 10), makeChar('B', 10, 10), logger).run()
    expect(logger.messages.some(m => m.includes('Draw'))).toBe(true)
  })
})
