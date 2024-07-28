import envoy
import feature.{type Feature}

// A configuration of a running instance of the application
pub type Config {
  Config(mode: Mode, enabled_features: List(Feature))
}

// The Mode of the instance, used to determine how the application should behave
// particularly in terms of logging and error handling
pub type Mode {
  Development
  Production
}

pub fn from_env() -> Config {
  // Get the mode to run the application in
  // Defaults to development if not explicitly set
  let mode = case envoy.get("MODE") {
    Ok("production") -> Production
    _ -> Development
  }
  // A list of features to enable, defaults to none
  let enabled_features = []
  // TODO: Find which features we want to use
  // TODO: Figure out the patternt o enable features
  // NOTE: Should each feature be a different environment variable?
  // --- The key being set is considered true, and the value can be metadata
  Config(mode, enabled_features)
}
