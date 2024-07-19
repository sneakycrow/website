---
title: 'New Lab: GAML'
slug: new-lab-gaml
summary: A tool for generating 'edits' made to a blog post
category: coding
edits:
- id: 67bf4c033dd1d6b545df7f7603cc050aaa526e8c
  message: Add automated edits from git history (#288)
  author: Zachary Corvidae
  timestamp: '1721335196'
- id: e0b0d1243fff1031f8a0426109135ba120cdea92
  message: add example image for edits
  author: Zachary Corvidae
  timestamp: '1721402639'
- id: e8ab13e18a319f0017b74b23619e1171b77b71f1
  message: Update gaml link (#289)
  author: Zachary Corvidae
  timestamp: '1721335265'
---

## What is GAML?

GAML is a tool I made for myself which allows me to parse edits made to a file in git as content to be displayed on a blog post.

It allows me to display a new section in a blog post which shows all the edits made to the post, including the author, timestamp, and message. I find this really useful as both a reader and an author.

![edits example in playing with gleam](/share/ss/edits_example.png)
I organically go in and edit posts, and I found it tedious to manually keep track of that, especially since git is already tracking that information. So I made GAML to automate that process.

Check out the in the labs directory [here](https://github.com/sneakycrow/website/tree/main/labs/gaml)
