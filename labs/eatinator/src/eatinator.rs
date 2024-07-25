use crate::config::Config;
use crate::error::{Error, ErrorCode};
use tracing::{event, Level};

#[derive(Default)]
pub(crate) struct Eatinator {
    config: Config,
    pool: Option<sqlx::PgPool>,
}

impl Eatinator {
    // Create a new instance of the application with the provided config
    pub(crate) fn new(config: Config) -> Self {
        Eatinator { config, pool: None }
    }
    // Initialize the database using the provided configuration
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
