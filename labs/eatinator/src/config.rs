#[derive(Default, Clone)]
pub struct Config {
    pub database_url: Option<String>,
    pub mode: Mode,
}

#[derive(Debug, Default, Clone)]
pub enum Mode {
    Production,
    #[default]
    Development,
}

impl Config {
    pub(crate) fn new() -> Self {
        // Analyze the mode first, because in dev mode we can use .env file
        let mode = match std::env::var("MODE") {
            Ok(mode) => match mode.as_str() {
                "development" => Mode::Development,
                // Presume production if not explicitly set
                _ => Mode::Production,
            },
            Err(_) => Mode::Development,
        };
        // Next, evaluate all the properties based on environment variables
        let database_url = match std::env::var("DATABASE_URL") {
            Ok(database_url) => Some(database_url),
            Err(_) => None,
        };

        Config { database_url, mode }
    }
}
