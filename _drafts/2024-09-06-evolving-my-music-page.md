---
title: "Evolving my music page"
slug: "evolving-my-music-page"
summary: "A look into how I turned a simple music page into a full music data ingestion software"
category: "coding"
---

I love my [music page](/music). It's a simple page that shows my most recently played songs on Spotify.
It's a fun way to share what I'm listening to and a great way to show off my music taste. But I wanted to do
more with it.

One of my favorite parts of programming is just collecting and displaying data. I love interacting with API's for video
games, music, books, and more. I think collecting data dynamically on/for myself and then analyzing that in interesting
ways is a blast.

## The old way

The way I was doing it was utilizing OAuth integrations for connecting my Spotify account, and then having the backend utilize
my account to get recent tracks data from Spotify.

It's simple and it works great, win win.

## The new way

The new way actually saves data historically and let's us query it ourselves. It builds upon the initial way,
still getting recent tracks, but now it parses them and saves them to the database. That's actually it for ingestion,
which is great.

The real fun comes in the querying. I can now query my music data in a variety of ways. I can see how many times I've listened to a song,
but more interestingly, I can be more specific with my range.

I call this project "unwrapped". It's an extension of Spotify's annual Wrapped feature, but allows me to analyze whenever
I'd like, as well as ingest more data than Spotify's Wrapped feature, like if I wanted to switch to a different music service.
