import { Ability } from './Ability'
import { DamageReduction } from './DamageReduction'
import { PowerStrike } from './PowerStrike'
import { SecondWind } from './SecondWind'

export class AbilityRegistry {
  private readonly abilities = new Map<string, Ability>()

  register(name: string, ability: Ability): void {
    this.abilities.set(name, ability)
  }

  get(name: string): Ability {
    const ability = this.abilities.get(name)
    if (!ability) throw new Error(`Unknown ability: "${name}"`)
    return ability
  }
}

export const defaultRegistry = new AbilityRegistry()
defaultRegistry.register('PowerStrike', new PowerStrike())
defaultRegistry.register('DamageReduction', new DamageReduction())
defaultRegistry.register('SecondWind', new SecondWind())
