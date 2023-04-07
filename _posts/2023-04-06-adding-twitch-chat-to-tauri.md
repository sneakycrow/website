---
title: "chats controller - update 1"
category: "software"
summary: "basic twitch chat integration via tauri"
series_key: "chats-controller"
series_pos: 1
---

# chats controller - update 1

This month I've been working on a project called [chats controller][github-cc]. It's a project that I've been wanting to
work on for a while, but I've been waiting for the right time to start it. I've been wanting to learn more about Rust,
and I've been wanting to learn more about GUI development. So, I decided to combine all of these things into one
project.

Today, I was able to connect the Twitch chat to the GUI and display messages from within the GUI. I'm
using [Tauri][tauri]. It's a framework for building desktop applications with web technologies. It's still in beta, but
it's been working well for me so far. I'm using [React][react] for the frontend, and [Rust][rust] for the backend.

Here's a neat little preview of what it looks like so far:
![preview](/chats-controller-1-preview.gif)

[github-cc]:https://github.com/sneakycrow/chats-controller

[tauri]:https://tauri.studio/en/

[react]:https://reactjs.org/

[rust]:https://www.rust-lang.org/