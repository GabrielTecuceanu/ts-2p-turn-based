import type { Ability, AbilityActivation } from './Ability';

export class Poke implements Ability {
  readonly name = 'Poke';

  onAttack(baseDamage: number): AbilityActivation {
    if (Math.random() < 0.05) {
      return {
        activated: true,
        modifiedValue: Math.floor(baseDamage * 2.0),
        logMessage: 'Poke! It finally landed.',
      };
    }
    return { activated: false, modifiedValue: baseDamage };
  }

  onDefend(incomingDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: incomingDamage };
  }
}
