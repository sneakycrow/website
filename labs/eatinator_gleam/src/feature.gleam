// A feature that can be enabled or disabled,
// usually representing the type of data we want to collect
pub opaque type Feature {
  SpotifyRecentTracks
}

pub type FeatureError {
  UnknownFeature
}

pub fn from_str(feat: String) -> Result(Feature, FeatureError) {
  case feat {
    "spotify_recent_tracks" -> Ok(SpotifyRecentTracks)
    _ -> Error(UnknownFeature)
  }
}
