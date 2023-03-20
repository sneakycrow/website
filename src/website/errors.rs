use std::io;

use thiserror::Error;

#[derive(Error, Debug)]
pub(crate) enum WebsiteError {
    #[error("could not generate website due to critical error")]
    CriticalWebsiteError(#[from] io::Error),
}
