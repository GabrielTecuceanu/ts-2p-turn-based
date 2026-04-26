import { AbilitySource } from './abilities/AbilitySource'

export class Character {
  hp: number

  constructor(
    public readonly name: string,
    public readonly maxHp: number,
    public readonly baseDamage: number,
    public readonly abilitySource: AbilitySource,
  ) {
    this.hp = maxHp
  }

  get isAlive(): boolean {
    return this.hp > 0
  }

  takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount)
  }
}
