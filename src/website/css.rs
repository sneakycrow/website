use std::fs;
use std::fs::FileType;
use walkdir::WalkDir;

enum Stylesheet {
    CSS,
    SASS,
}

impl Stylesheet {
    fn from_directory(path: &str) -> Result<Self, std::io::Error> {
        for entry in WalkDir::new(path) {
            let entry = entry.unwrap();
            println!("{:?}", fs::metadata(".sass"));
            println!("{}", entry.path().display());
        }

        Ok(Stylesheet::SASS)
    }
}
