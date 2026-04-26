# duel-game

## Installation & Running

```bash
npm install

# Run a single game with full combat logs
npx ts-node src/index.ts --mode single

# Run an ability tournament (N simulated games, win rates only)
npx ts-node src/index.ts --mode simulate --rounds 1000

# Tests
npm test
npm test -- --watch
npm test -- --coverage
```

## Architecture

### Strategy: `AbilitySource`

Each `Character` holds an `AbilitySource`. `Combat` calls `character.abilitySource.getAbility(round)` each round to determine which ability the character uses.

| Class                 | Behaviour                             |
| --------------------- | ------------------------------------- |
| `FixedAbilitySource`  | Returns the same ability every round  |
| `RandomAbilitySource` | Picks randomly from a pool each round |

New assignment strategies are added by implementing the `AbilitySource` interface; no existing code changes needed.

### Dependency Injection: `Logger`

`Combat` receives a `Logger` interface rather than writing to the console directly.

- `ConsoleLogger` - used in production for human-readable output
- `NullLogger` - used in `Simulation` to eliminate I/O overhead across thousands of games

### Registry / Factory: `AbilityRegistry`

A `string -> Ability` factory map. Abilities are registered once at startup and looked up by name when building characters, decoupling construction from usage.

## Abilities

| Ability           | Effect                            |
| ----------------- | --------------------------------- |
| `PowerStrike`     | Boosts attack damage              |
| `DamageReduction` | Reduces incoming damage on defend |
| `SecondWind`      | Heals on defend                   |
| `Poke`            | Weak attack                       |
| `Rampage`         | Overpowered attack                |
