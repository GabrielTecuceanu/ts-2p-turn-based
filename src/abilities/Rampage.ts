import { Ability, AbilityActivation } from './Ability'

export class Rampage implements Ability {
  readonly name = 'Rampage'

  onAttack(baseDamage: number): AbilityActivation {
    if (Math.random() < 0.75) {
      return {
        activated: true,
        modifiedValue: baseDamage * 2,
        logMessage: 'Rampage! 2x damage',
      }
    }
    return { activated: false, modifiedValue: baseDamage }
  }

  onDefend(incomingDamage: number): AbilityActivation {
    if (Math.random() < 0.65) {
      return {
        activated: true,
        modifiedValue: 0,
        logMessage: 'Rampage shield! Negated all incoming damage',
      }
    }
    return { activated: false, modifiedValue: incomingDamage }
  }
}
