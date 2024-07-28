use tracing::{event, Level};

#[derive(Default, Clone)]
pub struct Config {
    pub database_url: Option<String>,
    pub mode: Mode,
    pub featured_email: Option<String>, // The featured email, used for the account
    pub enabled_features: Option<Vec<Feature>>, // A list of vendor enabled features, such as `spotify:recently-played`
}

#[derive(Debug, Default, Clone)]
pub enum Mode {
    Production,
    #[default]
    Development,
}

#[derive(Debug, Clone, PartialEq)]
pub enum Feature {
    SpotifyRecentlyPlayed,
    Unknown,
}

impl From<String> for Feature {
    fn from(feature: String) -> Self {
        match feature.as_str() {
            "spotify:recently-played" => Feature::SpotifyRecentlyPlayed,
            _ => {
                event!(Level::ERROR, "Unknown feature: {}", feature);
                Feature::Unknown
            }
        }
    }
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
        // Next, evaluate the featured email based on environment variables
        let featured_email = match std::env::var("FEATURED_EMAIL") {
            Ok(featured_email) => Some(featured_email),
            Err(_) => None,
        };
        // Next, evaluate the features to enabled based on environment variables
        let enabled_features = match std::env::var("ENABLED_DINNERS") {
            Ok(enabled_features) => {
                let enabled_features: Vec<Feature> = enabled_features
                    .split(',')
                    // Map each feature to a Feature enum
                    .map(|feature| Feature::from(feature.to_string()))
                    // Remove any unknown features
                    .filter(|feature| *feature != Feature::Unknown)
                    // Remove any duplicates
                    .fold(Vec::new(), |mut acc, feature| {
                        if !acc.contains(&feature) {
                            acc.push(feature);
                        }
                        acc
                    });
                // If there are no enabled features, return None
                // Otherwise, return the list of enabled features
                if enabled_features.is_empty() {
                    None
                } else {
                    Some(enabled_features)
                }
            }
            Err(_) => None,
        };

        // Finally, return the Config struct
        Config {
            database_url,
            featured_email,
            mode,
            enabled_features,
        }
    }
}
