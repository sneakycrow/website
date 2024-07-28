import config
import gleam/io
import logging

pub fn main() {
  let config = config.from_env()
  // Start the logger
  logging.configure()
  case config.mode {
    config.Development -> logging.set_level(logging.Debug)
    config.Production -> logging.set_level(logging.Info)
  }
  // Set the log level based on the config
  io.println("Hello from eatinator_gleam!")
}
