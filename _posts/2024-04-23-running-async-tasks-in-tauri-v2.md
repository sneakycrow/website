---
title: "Running backend async tasks in tauri v2"
slug: "running-backend-async-tasks-in-tauri-v2"
summary: "How to run backend async tasks in tauri v2 and push data to the frontend"
---

## Introduction

Welcome to our tutorial on running backend async tasks in [Tauri v2][tauriv2] and seamlessly pushing data to the frontend! In this guide, we'll delve into the process of orchestrating asynchronous backend operations while synchronously updating the frontend. Our example project revolves around crafting a Twitch Chat application, where we'll establish a connection to Twitch's IRC, fetch messages, and dynamically present them within our application interface.

The core of our approach lies in leveraging Tauri's robust event system to seamlessly bridge the gap between backend processes and frontend presentation. By the end of this tutorial, you'll have a clear understanding of how to synchronize backend async tasks with frontend data updates, empowering you to build responsive and dynamic applications with Tauri.

## Project Setup

To kickstart our journey, ensure you have Tauri v2 and its associated tooling installed. If not, you can swiftly set it up by installing create-tauri-app using Cargo:

```shell
cargo install create-tauri-app
```

Then, initialize your Tauri application using:

```shell
cargo create-tauri-app --beta
```

While we'll be utilizing React for the frontend in this tutorial, feel free to adapt the frontend framework of your choice. The crux of our focus, however, will lie in configuring and executing backend tasks efficiently.

**[Explore alternative installation methods via Tauri's official documentation](https://beta.tauri.app/start/create-project/)**

For a visual walkthrough of the setup process, watch the following clip:

<script src="https://asciinema.org/a/Y14AWJ8No92Hm4upWYawQmeOJ.js" id="asciicast-656442" async="true"></script>

## Running the background tasks

Now that our project is primed, let's dive into creating long-running async tasks capable of dispatching data to the frontend. Our objective? Establish a connection to Twitch's chat service, continuously fetch incoming messages, and seamlessly relay them to our application's frontend.

We'll achieve this by spawning an async task that orchestrates the connection to Twitch's IRC, diligently processing incoming messages. Additionally, we'll equip this task with the capability to dispatch these messages to the frontend using event handlers.

To streamline your setup, we'll specify the necessary dependencies, demonstrate how to initialize the Twitch IRC connection within the chat module, and configure the Tauri builder to seamlessly integrate our newly minted chat module.

`TODO: Specify which dependencies we added`
`TODO: Show how to instantiate the twitch irc connection in the chat module`
`TODO: Show how to setup the tauri builder to initialize our new chat module`

## Sending data to the frontend

`TODO: Show how to start listening for events in React`

## Conclusion

In summary, we've embarked on a journey to synchronize backend async tasks with frontend data presentation using Tauri v2. By crafting a Twitch Chat application, we've learned to orchestrate long-running tasks, seamlessly dispatch data to the frontend, and foster dynamic user experiences.
