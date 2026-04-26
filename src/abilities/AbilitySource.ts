import type { Ability } from './Ability';

export interface AbilitySource {
  getAbility(round: number): Ability;
}

export class FixedAbilitySource implements AbilitySource {
  constructor(private readonly ability: Ability) {}

  getAbility(_round: number): Ability {
    return this.ability;
  }
}

export class RandomAbilitySource implements AbilitySource {
  constructor(private readonly pool: Ability[]) {}

  getAbility(_round: number): Ability {
    return this.pool[Math.floor(Math.random() * this.pool.length)];
  }
}
