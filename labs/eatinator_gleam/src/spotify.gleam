import gleam/option.{type Option}

// Tag represents strings that can be used to categorize tracks and albums
// It can contain things like genre, mood, or any other arbitrary information to help categorize the music
pub type Tag {
  Tag(tag: String)
}

// A specific track from an album
pub type Track {
  Track(title: String, album: Album, tags: Option(List(Tag)))
}

// An album, containing the artist, title, year of release, and an image
pub type Album {
  Album(
    artist: String,
    title: String,
    image: String,
    year: Int,
    tags: Option(List(Tag)),
  )
}
