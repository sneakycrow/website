pub(crate) mod spotify;

use serde::Serialize;

// A vendor represents a connection to a third-party service
pub(crate) trait Vendor {
    fn name() -> &'static str; // The name of the vendor
    async fn records(&self) -> Vec<VendorRecord>; // The individual records from the vendor
}

// A record represents a single piece of data from a vendor
#[derive(Serialize)]
pub(crate) struct VendorRecord {
    pub(crate) record_type: String, // The unique type of record provided by the vendor
    pub(crate) data: serde_json::Value, // The data for the record
}

// A trait representing a record type
pub(crate) trait RecordType {
    fn into_record(self) -> VendorRecord;
}
