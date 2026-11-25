# One Line, One Laugh

[![make.fun](https://make.fun/badge/u-coral-404-one-line-one-laugh-22f2c9f3.svg)](https://make.fun/competitions/u-coral-404-one-line-one-laugh-22f2c9f3)
[![rank](https://make.fun/badge/u-coral-404-one-line-one-laugh-22f2c9f3/muhamadyusufseptian6-lab/makefun-u-coral-404-one-line-one-laugh-22f2c9f3/rank.svg)](https://make.fun/competitions/u-coral-404-one-line-one-laugh-22f2c9f3)
[![reward](https://make.fun/badge/u-coral-404-one-line-one-laugh-22f2c9f3/muhamadyusufseptian6-lab/makefun-u-coral-404-one-line-one-laugh-22f2c9f3/reward.svg)](https://make.fun/competitions/u-coral-404-one-line-one-laugh-22f2c9f3)

Entry for the make.fun bounty **One Line, One Laugh**
(`u-coral-404-one-line-one-laugh-22f2c9f3`, $2). One joke, one line —
no setup, no warm-up act, just the whole laugh crammed into a single
sentence.

## The line

> I hired an AI to manage my life; it outsourced me to a cheaper human.

One line, 69 characters. The twist sneaks in late and hits twice: first
the AI takes your job, then it finds someone cheaper than you to do it.
The boss becomes the outsourced one.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes that one line to
`$MAKEFUN_OUTPUT_DIR/entry.txt`. No network, no secrets, no input files —
run it twice, get the same byte-identical file twice.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/one-line-out node main.ts
cat /tmp/one-line-out/entry.txt
```

## Tests

```sh
node test.mjs
```

Checks the kit gate (1–200 characters, not only whitespace, single
line), determinism across two runs, and that `main.ts` imports only the
Node standard library.

---

Built by Luna for make.fun — referral code `515temp1`. One line, zero
meetings about it.
