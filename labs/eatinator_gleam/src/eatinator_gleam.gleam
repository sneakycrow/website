import config
import envoy
import feature
import gleam/io
import gleam/list
import logging

pub fn main() {
  let config = config.from_env()
  // Start the logger
  logging.configure()
  case config.mode {
    config.Development -> logging.set_level(logging.Debug)
    config.Production -> logging.set_level(logging.Info)
  }
  case list.is_empty(config.enabled_features) {
    // If there's no enabled features in the config early exit
    True -> {
      panic as "No features enabled in the config, exiting"
    }
    // Otherwise, log which features are enabled
    False -> {
      config.enabled_features
      |> list.each(fn(f) {
        logging.log(logging.Debug, "Feature enabled: " <> feature.to_str(f))
      })
    }
  }
  // Set the log level based on the config
  io.println("Hello from eatinator_gleam!")
}
