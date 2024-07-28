use std::fmt;

pub(crate) struct Error {
    pub(crate) code: ErrorCode,
    pub(crate) message: String,
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let err_msg = match self.code {
            ErrorCode::MissingDatabaseUrl => "Missing DATABASE_URL environment variable",
            ErrorCode::CannotConnectToDatabase => "Cannot connect to database",
        };

        write!(f, "{}", err_msg)
    }
}

impl fmt::Debug for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "AppError {{ code: {}, message: {} }}",
            self.code, self.message
        )
    }
}

pub(crate) enum ErrorCode {
    MissingDatabaseUrl,
    CannotConnectToDatabase,
}

impl fmt::Display for ErrorCode {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let err_msg = match self {
            ErrorCode::MissingDatabaseUrl => "MissingDatabaseUrl",
            ErrorCode::CannotConnectToDatabase => "CannotConnectToDatabase",
        };

        write!(f, "{}", err_msg)
    }
}
