---
path: "/lights-out-webgl-implementation"
date: "Dec 07, 2023"
sortDate: 2023/12/07
title: "Lights Out WebGL Implementation"
author: "Anwar Haredy"
description: "Return to blogging and a complete lights out implementation"
---

<h2>Introduction</h2>

Two years ago I started this blog in hopes of writing about Computer Science and my side projects often. Unfortuantely,
I abandoned it as soon as I got my first job and life sort of got in the way. I am now more than willing to revive it and this
time I intend to stick with it. I am starting simple by re-implementing a simple game I've made two years ago but this time in WebGL instead of html/css/javascript. The game is lights out. You can find the previous article [here](https://www.anwarharedy.com/lights-on/) (although the links in that one do not work).

<h2>What changed</h2>

I will keep this brief since you can read the previous article to get the gist of the game and also I link an article that explains how to implement an effecient solution. I changed two things from my previous implementation:

- The game is now written in WebGL
- The solver is now an effecient solver that can solve for arbitrary N in reasonable time

The previous solver was a brute force solver than ran in exponential time, which was obviously dreadful but I did it because I could not come up with the effecient solution on my own.

<h2>The Game</h2>

You can find a link to the game by [clicking here](https://www.anwarharedy.com/lights-on-game/). Please reach out to me if you experience any bugs or undesired behaviour.
