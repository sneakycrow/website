// An account represents a connected account in the database, presumably with valid credentials to access the vendor's API
// Internally, this module handles all of the direct interactions with the Database
use crate::error::Error;

pub(crate) struct Account {
    id: String,
    access_token: String,
    refresh_token: String,
    expires_at: i64,
}

impl Account {
    // A function for returning an account based on user email
    pub(crate) async fn by_email(email: &str) -> Result<Self, Error> {
        todo!("Lookup the user by email, join the account, and return the account")
    }
    // A function for saving new tokens to the database
    fn save_tokens(
        &self,
        access_token: String,
        refresh_token: String,
        expires_at: i64,
    ) -> Result<(), Error> {
        todo!()
    }
}
