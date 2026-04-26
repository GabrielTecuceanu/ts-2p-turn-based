import type { Character } from './Character';
import { Combat } from './Combat';
import { NullLogger } from './Logger';

type CharacterFactory = () => Character;

export interface SimulationResult {
  aWins: number;
  bWins: number;
  draws: number;
  totalRounds: number;
}

export class Simulation {
  constructor(
    private readonly factoryA: CharacterFactory,
    private readonly factoryB: CharacterFactory,
    private readonly rounds: number,
  ) {}

  run(): SimulationResult {
    const result: SimulationResult = { aWins: 0, bWins: 0, draws: 0, totalRounds: this.rounds };
    const logger = new NullLogger();

    for (let i = 0; i < this.rounds; i++) {
      const a = this.factoryA();
      const b = this.factoryB();
      const winner = new Combat(a, b, logger).run();

      if (winner === null) result.draws++;
      else if (winner === a) result.aWins++;
      else result.bWins++;
    }

    return result;
  }
}
