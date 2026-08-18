---
title: "Discussing Backside Power with Middle School Students"
slug: discussing-backside-power-with-middle-school-students
oldSlug: 1259-2
date: 2025-07-22
author: "Ken Hawthorn"
excerpt: "Most adults do not study the technical process of microchip fabrication, so most ten year olds are not exposed to it. An ASC field trip can fix this."
cover: /images/blog/discussing-backside-power-with-middle-school-students/rsw_1280-2.webp
---

Most adults do not study the technical process of microchip fabrication, so most ten year olds are not exposed to it. An ASC field trip can fix this.

A few miles up the road from Austin is the new [Samsung](https://semiconductor.samsung.com/sas/company/taylor/) chip fab. The new facility is part of a larger $37 billion investment in Central Texas by Samsung.

Making microchips is difficult. Making the wires (traces) on the chips smaller and smaller requires new machines and processes to be invented and billions of dollars each time a chip fab moves to a new, smaller wire diameter. Right now 7 nanometer wire diameter is really interesting. Getting to 2 nanometers is going to be a lot of work over many years. One part of the solution is to put the power (not data) wires on the backside of the chip. Since chip wafers are etched from the top this presents quite a challenge. Today’s 10 year old will be 22 when we are expected to get the below two nanometers. So why not get them involved with understanding that roadmap right now? They actually already know most of the foundational knowledge they need to dive into chip fab technology confidently.

Let’s look at the current progression of electrical circuit knowledge as students go through school. By doing this we can see students are actually very well prepared with the needed foundational knowledge by middle school at the lastest (and if they are not we can get them there in the first 20 minutes of an ASC field trip).

**Warm‑up: flipping on an LED the first time**

Walk into any elementary school makerspace and you’ll spot a classic rite of passage: a young student connects (pinches) two LED legs across two faces of a coin‑cell battery, eyes widen, and suddenly electricity is _real_. Two terminals, one bright result. For the youngest tinkerers (as soon as they’re past the “might‑eat‑the‑battery” stage), that’s impactful.

**Leveling up: switches, gates, and clicky relays**

By upper‑elementary grades, the impactful coin cell/LED experience leads to into more complex physical models. We swap fingers for jumper wires and add switches in order to model AND, OR, and NOT gates. Next step: Give a sixth‑grader a handful of relays and Arduino; they will wire a truth table before lunch—rapid‑fire clicks reminding everyone that code ultimately becomes current.

**The solid‑state “aha”**

Somewhere in this progression—whether in a makerspace classroom or during the first 20 minutes of an Austin STEM Center (ASC) field trip—students meet the transistor: a _silent_ solid‑state version of the same on/off idea. Once that sinks in, a natural question pops up:* “Okay… if every transistor needs power and signal lines, how do engineers keep shrinking chips without running out of real estate?”*

**Enter backside power (and why it’s middle‑school‑friendly)**

At today’s chip fabrication frontier, the answer is [backside power delivery](https://www.imec-int.com/en/articles/how-power-chips-backside). Instead of piling both signal and power wires on the top metal layers (picture a house with every pipe and cable routed through the attic), engineers flip the power rails underneath the silicon. Signals get the penthouse; power moves from the basement. The result: less crowding, lower resistance, and room for still more transistors.

Is that really a leap too far for middle‑school minds? Hardly. They already understand:

- **Polarity** from LED + battery experiments.

- **Routing constraints** from breadboard spaghetti.

- **Layer separation** from every sandwich they’ve ever made.

Backside power is just the next logical slice—and an eye‑opening segue to the nanoscopic road ahead.

**The roadmap: from 7nm to 2nm to Ångström traces**

![](/images/blog/discussing-backside-power-with-middle-school-students/rsw_1280-2.webp)

We can walk students through the above chart and they can understand it (especially with 3D printed model presented as puzzles!). We want them to see:

1. FinFET to Nanosheet (Gate‑All‑Around): stack the channel sideways, wrap the gate on four sides.

2. Backside power debut: more room up top, fewer voltage drops.

3. CFET and 2DFET eras: vertical skyscrapers of stacked transistors and wafer‑thin 2D materials.

Pair that with this [Anastasi In Tech’s](https://www.youtube.com/watch?v=DXgZ3X8z7eE&t=1099s) explainer video, pause at each milestone, and challenge students to spot the engineering rhyme: _solve one limit, reveal the next_. It’s the same iterative game they play in Minecraft redstone—just at scales measured in Ångströms instead of pixels.

**Why ASC pushes these conversations now**

Our mission is simple: we raise the bar for depth and complexity in STEM while we lower the age of the consumer. If a 12‑year‑old can make logic gates with jumpers and switches, they can grasp why shifting power rails to the backside buys space on a wafer. When middle‑schoolers see their everyday LED logic echoed in cutting‑edge fabs, two powerful things happen:

- **Relevance snaps into focus.** Advanced tech isn’t black‑box magic; it’s an extension of principles they already know.

- **Ambition expands.** Suddenly “chip engineer” feels as attainable—and as exciting—as “game developer” or “YouTuber”.** Your turn: what else looks “too complex”… until it isn’t?**

Backside power is only one example. Quantum error correction? Photonic waveguides? Error‑detecting ECC memory? If it unlocks the future, it _belongs on a well‑scaffolded middle‑school roadmap_.

Email [ken@austinstemcenter.org](mailto:ken@austinstemcenter.org) with your ideas.

Let’s keep shrinking the distance between “too advanced” and “totally doable”—one LED, one nanosheet, one inspired student at a time.
