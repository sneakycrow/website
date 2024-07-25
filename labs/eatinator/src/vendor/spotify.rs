use super::{RecordType, Vendor, VendorRecord};
use serde::Serialize;

struct SpotifyData;

impl Vendor for SpotifyData {
    fn name() -> &'static str {
        "spotify"
    }

    async fn records(&self) -> Vec<VendorRecord> {
        todo!()
    }
}

enum SpotifyRecordType {
    RecentlyPlayed(Track),
}

impl RecordType for SpotifyRecordType {
    fn into_record(self) -> VendorRecord {
        match self {
            SpotifyRecordType::RecentlyPlayed(track) => VendorRecord {
                record_type: "recently_played".to_string(),
                data: serde_json::to_value(track).unwrap(),
            },
        }
    }
}

#[derive(Serialize)]
struct Track {
    name: String,
    artist: String,
    album: String,
    played_at: String,
}
