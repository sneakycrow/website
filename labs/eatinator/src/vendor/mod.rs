pub(crate) mod spotify;

pub(crate) trait VendorData {
    fn to_json() -> String; // TODO: Return actual JSON somehow, maybe impl serde::Serialize?
}

pub(crate) trait Vendor {
    fn name() -> &'static str;
    fn get_data() -> impl VendorData;
}
