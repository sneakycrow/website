use crate::account::Account;
use crate::config::{Config, Feature};
use crate::error::{Error, ErrorCode};
use crate::vendor::Vendor;
use tracing::{event, Level};

#[derive(Default)]
pub(crate) struct Eatinator {
    config: Config,
    pool: Option<sqlx::PgPool>,
    account: Option<Account>, // The account for which we will fetch the records
    vendors: Option<Vec<Box<dyn Vendor>>>, // The vendors for which we will fetch the records
}

impl Eatinator {
    // Create a new instance of the application with the provided config
    pub(crate) fn new(config: Config) -> Self {
        Eatinator {
            config,
            account: None,
            pool: None,
            vendors: None,
        }
    }
    // Initialize the database using the provided configuration
    // Enables a pool and uses that pool to initialize the account
    pub(crate) async fn init_db(&mut self) -> Result<&Self, Error> {
        if let Some(database_url) = &self.config.database_url {
            let pool = sqlx::PgPool::connect(database_url)
                .await
                .map_err(|_| Error {
                    code: ErrorCode::CannotConnectToDatabase,
                    message: "Cannot connect to database".to_string(),
                })?;
            self.pool = Some(pool);
            event!(
                Level::DEBUG,
                "Database connection pool successfully initialized"
            );
            Ok(self)
        } else {
            Err(Error {
                code: ErrorCode::MissingDatabaseUrl,
                message: "Missing DATABASE_URL environment variable".to_string(),
            })
        }
    }
    // Collect the vendors that will be used
    pub(crate) async fn collect_vendors(&self) -> Result<&Self, Error> {
        // If the vendors were already collected, return early
        if self.vendors.is_some() {
            return Ok(self);
        }
        // Otherwise, collect the vendors based on enabled features in the configuration
        let vendors: Vec<Box<dyn Vendor>> = vec![];
        // Loop through each enabled feature and map it to the corresponding vendor
        if let Some(features) = &self.config.enabled_features {
            for feature in features {
                match feature {
                    Feature::SpotifyRecentlyPlayed => {
                        vendors.push(Box::new(crate::vendor::SpotifyVendor::new()));
                    }
                    _ => {
                        event!(
                            Level::WARN,
                            "Feature {:?} is not supported by any vendor",
                            feature
                        );
                    }
                }
            }
        }
        event!(Level::DEBUG, "Starting vendor collection");
        todo!()
    }
    // Collect the accounts for each vendor, these are the accounts that will be used to authorize the requests
    pub(crate) async fn collect_accounts(&self) -> Result<&Self, Error> {
        event!(Level::DEBUG, "Starting account collection");
        todo!()
    }
    // Collect the records from the vendors
    pub(crate) async fn collect_records(&self) -> Result<&Self, Error> {
        event!(Level::DEBUG, "Starting record collection");
        todo!()
    }
}
