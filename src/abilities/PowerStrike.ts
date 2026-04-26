import type { Ability, AbilityActivation } from './Ability';

export class PowerStrike implements Ability {
  readonly name = 'PowerStrike';

  onAttack(baseDamage: number): AbilityActivation {
    if (Math.random() < 0.5) {
      return {
        activated: true,
        modifiedValue: Math.floor(baseDamage * 1.5),
        logMessage: 'Power Strike! +50% damage',
      };
    }
    return { activated: false, modifiedValue: baseDamage };
  }

  onDefend(incomingDamage: number): AbilityActivation {
    return { activated: false, modifiedValue: incomingDamage };
  }
}
