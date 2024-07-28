import envoy
import gleam/option.{None, Some}

// A feature that can be enabled or disabled,
// usually representing the type of data we want to collect
pub opaque type Feature {
  SpotifyRecentTracks
}

// Errors specifically related to features, such as unknown features or invalid data
pub type FeatureError {
  UnknownFeature
}

// For trying to parse a string into a feature
pub fn from_str(feat: String) -> Result(Feature, FeatureError) {
  case feat {
    "spotify_recent_tracks" -> Ok(SpotifyRecentTracks)
    _ -> Error(UnknownFeature)
  }
}

// For converting a feature into a string
pub fn to_str(feat: Feature) -> String {
  case feat {
    SpotifyRecentTracks -> "Spotify Recent Tracks"
  }
}

// Collects all enabled features from the environment
pub fn all_from_env() -> List(Feature) {
  // Temporary for testing
  envoy.set("FEATURE_SPOTIFY_RECENT_TRACKS", "true")
  // Spotify Recent Tracks
  let spotify_recent_tracks = case envoy.get("FEATURE_SPOTIFY_RECENT_TRACKS") {
    Ok("true") -> Some(SpotifyRecentTracks)
    _ -> None
  }
  // Return only the enabled features (Some values)
  option.values([spotify_recent_tracks])
}
