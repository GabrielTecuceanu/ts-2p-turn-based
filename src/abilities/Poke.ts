import { Ability, AbilityActivation } from './Ability'

export class Poke implements Ability {
  readonly name = 'Poke'

  onAttack(baseDamage: number): AbilityActivation {
    if (Math.random() < 0.15) {
      return {
        activated: true,
        modifiedValue: Math.floor(baseDamage * 1.1),
        logMessage: 'Poke! Slight bonus damage',
      }
    }
    return { activated: false, modifiedValue: baseDamage }
  }

  onDefend(incomingDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: incomingDamage }
  }
}
