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
    // Initialize the pool using the database URL from the configuration
    pub(crate) async fn init_pool(&mut self) -> Result<&Self, Error> {
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
}
