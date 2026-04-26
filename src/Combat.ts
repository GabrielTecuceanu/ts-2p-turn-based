import { Character } from './Character'
import { Logger } from './Logger'

export class Combat {
  private round = 0

  constructor(
    private readonly charA: Character,
    private readonly charB: Character,
    private readonly logger: Logger,
  ) {}

  runRound(): void {
    this.round++
    const { charA, charB, logger } = this

    logger.log(`\n--- Round ${this.round} ---`)

    const abilityA = charA.abilitySource.getAbility(this.round)
    const abilityB = charB.abilitySource.getAbility(this.round)

    logger.log(`${charA.name} uses ${abilityA.name} | ${charB.name} uses ${abilityB.name}`)

    // Resolve attacks
    const attackA = abilityA.onAttack(charA.baseDamage)
    const attackB = abilityB.onAttack(charB.baseDamage)

    // Resolve defenses
    const defendB = abilityB.onDefend(attackA.modifiedValue)
    const defendA = abilityA.onDefend(attackB.modifiedValue)

    // Log ability activations
    if (attackA.activated && attackA.logMessage) logger.log(`  ${charA.name}: ${attackA.logMessage}`)
    if (defendB.activated && defendB.logMessage) logger.log(`  ${charB.name}: ${defendB.logMessage}`)
    if (attackB.activated && attackB.logMessage) logger.log(`  ${charB.name}: ${attackB.logMessage}`)
    if (defendA.activated && defendA.logMessage) logger.log(`  ${charA.name}: ${defendA.logMessage}`)

    // Apply damage simultaneously
    charB.takeDamage(defendB.modifiedValue)
    charA.takeDamage(defendA.modifiedValue)

    logger.log(`  ${charA.name} → ${defendB.modifiedValue} dmg → ${charB.name} (${charB.hp}/${charB.maxHp} hp)`)
    logger.log(`  ${charB.name} → ${defendA.modifiedValue} dmg → ${charA.name} (${charA.hp}/${charA.maxHp} hp)`)
  }

  run(): Character | null {
    const { charA, charB, logger } = this

    logger.log(`Combat: ${charA.name} vs ${charB.name}`)

    while (charA.isAlive && charB.isAlive) {
      this.runRound()
    }

    if (charA.isAlive && !charB.isAlive) {
      logger.log(`\n${charA.name} wins!`)
      return charA
    }
    if (charB.isAlive && !charA.isAlive) {
      logger.log(`\n${charB.name} wins!`)
      return charB
    }
    logger.log('\nDraw!')
    return null
  }
}
