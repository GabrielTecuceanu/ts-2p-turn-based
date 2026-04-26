export interface AbilityActivation {
  activated: boolean;
  modifiedValue: number;
  logMessage?: string;
}

export interface Ability {
  readonly name: string;
  onAttack(baseDamage: number): AbilityActivation;
  onDefend(incomingDamage: number): AbilityActivation;
}
