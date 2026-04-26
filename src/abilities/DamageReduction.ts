import type { Ability, AbilityActivation } from './Ability';

export class DamageReduction implements Ability {
  readonly name = 'DamageReduction';

  onAttack(baseDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: baseDamage };
  }

  onDefend(incomingDamage: number): AbilityActivation {
    if (Math.random() < 0.5) {
      return {
        activated: true,
        modifiedValue: Math.floor(incomingDamage * 0.5),
        logMessage: 'Damage Reduction! Halved incoming damage',
      };
    }
    return { activated: false, modifiedValue: incomingDamage };
  }
}
