---
title: "Status Update - February 2023"
category: "meta"
summary: "project & life status update for the month of february in 2023 (monthly series)"
series_key: "status-monthly"
series_pos: 1
is_draft: false
---

This month has been _rough_. Lots of miscommunications that have caused a lot of heartache. But, at the time of writing
this, everything has been course corrected. I'm just exhausted.

### this month I learned

About tracing, particularly using [tracing][tracing-package] as an alternative to the [log][log-package], but also
just the concept of tracing in general. My approaches to logging, commenting, and tracing have all been consolidated so
fluidly that I ended up converting every active Rust project to use the tracing package now.

### isolary

I helped with one of Isolary's project, dockerizing and adding auto-deploy to their project. I also consolidated and
dramatically simplified the developer and deployment experience.
This was particularly fun for me, as I got to strategize around deploying to a more "classic" EC2 instance, but with a
modern GitOps approach.

I ended up creating a relatively simple flow, very integrated with Github (like environments, actions, packages, etc),
that utilized a static `docker-compose.json` file, and then used `jq` to fill in dynamic variables during the build
process.
Overall super happy with the outcome there.

### cobrashare

Cobrashare is getting farther with it's integration with Patreon. I've had to re-work a lot of systems,
both on the frontend and the backend. Long story short: the Node and React ecosystem move _fast_ and become quickly
unstable if not taken care of right.

[tracing-package]:https://docs.rs/tracing/latest/tracing/

[log-package]:https://docs.rs/log/latest/log/