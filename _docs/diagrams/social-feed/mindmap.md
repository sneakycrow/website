A list of events that we want to show

```mermaid
mindmap
    root((social_feed))
        Github
            Weekly Summary
            New Repository
        Blog
            New Post
            Mastodon
        Twitch
            Stream Summary
            Live Notice
        Spotify
            Weekly Summary
        Gaming
            Steam
            Playstation
```

This will probably need some ingress point for webhooks for some of this data, like from Github and Twitch

This diagram represents a potential database schema to represent the feed

```mermaid
erDiagram
    USER ||--o{ FEED_ITEM : has_many
    USER {
        string id
    }
    FEED_ITEM {
        foreign_key user_id
        enum type
        jsonb data
        timestampz created_at
        timestampz updated_at
    }
```
