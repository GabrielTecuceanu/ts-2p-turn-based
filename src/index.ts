import { Character } from './Character'
import { Combat } from './Combat'
import { Simulation } from './Simulation'
import { ConsoleLogger } from './Logger'
import { FixedAbilitySource, RandomAbilitySource } from './abilities/AbilitySource'
import { defaultRegistry } from './abilities/AbilityRegistry'

function buildWarrior(): Character {
  return new Character('Warrior', 100, 20,
    new RandomAbilitySource([
      defaultRegistry.get('PowerStrike'),
      defaultRegistry.get('DamageReduction'),
    ])
  )
}

function buildMage(): Character {
  return new Character('Mage', 80, 25,
    new FixedAbilitySource(defaultRegistry.get('SecondWind'))
  )
}

const args = process.argv.slice(2)
const modeIdx = args.indexOf('--mode')
const mode = modeIdx !== -1 ? args[modeIdx + 1] : 'single'
const roundsIdx = args.indexOf('--rounds')
const rounds = roundsIdx !== -1 ? parseInt(args[roundsIdx + 1], 10) : 1000

if (mode === 'single') {
  const combat = new Combat(buildWarrior(), buildMage(), new ConsoleLogger())
  combat.run()
} else if (mode === 'simulate') {
  const result = new Simulation(buildWarrior, buildMage, rounds).run()
  const { aWins, bWins, draws, totalRounds } = result
  const pct = (n: number) => ((n / totalRounds) * 100).toFixed(1)
  console.log(`Simulation over ${totalRounds} games:`)
  console.log(`  Warrior wins: ${aWins} (${pct(aWins)}%)`)
  console.log(`  Mage wins:    ${bWins} (${pct(bWins)}%)`)
  console.log(`  Draws:        ${draws} (${pct(draws)}%)`)
} else {
  console.error(`Unknown mode "${mode}". Use --mode single or --mode simulate`)
  process.exit(1)
}
