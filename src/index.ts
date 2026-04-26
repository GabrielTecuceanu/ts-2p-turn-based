import { defaultRegistry } from './abilities/AbilityRegistry';
import { FixedAbilitySource, RandomAbilitySource } from './abilities/AbilitySource';
import { Character } from './Character';
import { Combat } from './Combat';
import { ConsoleLogger } from './Logger';
import { Simulation } from './Simulation';

function buildWarrior(): Character {
  return new Character(
    'Warrior',
    100,
    20,
    new RandomAbilitySource([
      defaultRegistry.get('PowerStrike'),
      defaultRegistry.get('DamageReduction'),
    ]),
  );
}

function buildMage(): Character {
  return new Character('Mage', 80, 25, new FixedAbilitySource(defaultRegistry.get('SecondWind')));
}

const args = process.argv.slice(2);
const modeIdx = args.indexOf('--mode');
const mode = modeIdx !== -1 ? args[modeIdx + 1] : 'single';
const roundsIdx = args.indexOf('--rounds');
const rounds = roundsIdx !== -1 ? parseInt(args[roundsIdx + 1], 10) : 500;

if (mode === 'single') {
  const combat = new Combat(buildWarrior(), buildMage(), new ConsoleLogger());
  combat.run();
} else if (mode === 'simulate') {
  const abilityNames = defaultRegistry.names();
  const wins: Record<string, number> = {};
  const played: Record<string, number> = {};

  for (const name of abilityNames) {
    wins[name] = 0;
    played[name] = 0;
  }

  for (let i = 0; i < abilityNames.length; i++) {
    for (let j = i + 1; j < abilityNames.length; j++) {
      const nameA = abilityNames[i];
      const nameB = abilityNames[j];
      const result = new Simulation(
        () => new Character(nameA, 100, 20, new FixedAbilitySource(defaultRegistry.get(nameA))),
        () => new Character(nameB, 100, 20, new FixedAbilitySource(defaultRegistry.get(nameB))),
        rounds,
      ).run();
      wins[nameA] += result.aWins;
      wins[nameB] += result.bWins;
      played[nameA] += rounds;
      played[nameB] += rounds;
    }
  }

  const sorted = abilityNames.slice().sort((a, b) => wins[b] / played[b] - wins[a] / played[a]);
  const pct = (name: string) => ((wins[name] / played[name]) * 100).toFixed(1);
  const col = Math.max(...abilityNames.map((n) => n.length)) + 2;

  console.log(`Ability tournament - ${rounds} games per matchup, 100 hp / 20 dmg\n`);
  for (const name of sorted) {
    console.log(`  ${name.padEnd(col)} ${pct(name).padStart(5)}%`);
  }
} else {
  console.error(`Unknown mode "${mode}". Use --mode single or --mode simulate`);
  process.exit(1);
}
