// Games library
mod cube_spawner;

enum Game {
    CubeSpawner,
}

impl Game {
    pub fn run(&self) {
        match self {
            Game::CubeSpawner => cube_spawner::run(),
        }
    }
}

impl From<Game> for String {
    fn from(game: Game) -> Self {
        match game {
            Game::CubeSpawner => "cube_spawner".to_string(),
        }
    }
}
