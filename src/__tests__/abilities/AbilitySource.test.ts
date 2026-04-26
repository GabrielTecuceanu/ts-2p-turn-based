import type { Ability, AbilityActivation } from '../../abilities/Ability';
import { FixedAbilitySource, RandomAbilitySource } from '../../abilities/AbilitySource';

function makeAbility(name: string): Ability {
  return {
    name,
    onAttack(baseDamage: number): AbilityActivation {
      return { activated: false, modifiedValue: baseDamage };
    },
    onDefend(incomingDamage: number): AbilityActivation {
      return { activated: false, modifiedValue: incomingDamage };
    },
  };
}

describe('FixedAbilitySource', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the same ability regardless of round', () => {
    const ability = makeAbility('Test');
    const source = new FixedAbilitySource(ability);
    expect(source.getAbility(1)).toBe(ability);
    expect(source.getAbility(5)).toBe(ability);
    expect(source.getAbility(99)).toBe(ability);
  });
});

describe('RandomAbilitySource', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('picks pool[0] when random returns 0', () => {
    const [a, b, c] = [makeAbility('A'), makeAbility('B'), makeAbility('C')];
    const source = new RandomAbilitySource([a, b, c]);
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(source.getAbility(1)).toBe(a);
  });

  it('picks pool[1] when random returns 0.5 with 3 entries', () => {
    const [a, b, c] = [makeAbility('A'), makeAbility('B'), makeAbility('C')];
    const source = new RandomAbilitySource([a, b, c]);
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(source.getAbility(1)).toBe(b);
  });

  it('picks pool[2] when random returns 0.99 with 3 entries', () => {
    const [a, b, c] = [makeAbility('A'), makeAbility('B'), makeAbility('C')];
    const source = new RandomAbilitySource([a, b, c]);
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    expect(source.getAbility(1)).toBe(c);
  });
});
