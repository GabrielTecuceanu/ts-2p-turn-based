import type { Ability, AbilityActivation } from './Ability';

export class SecondWind implements Ability {
  readonly name = 'SecondWind';

  onAttack(baseDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: baseDamage };
  }

  onDefend(incomingDamage: number): AbilityActivation {
    if (Math.random() < 0.25) {
      return {
        activated: true,
        modifiedValue: 0,
        logMessage: 'Second Wind! Negated all incoming damage',
      };
    }
    return { activated: false, modifiedValue: incomingDamage };
  }
}
