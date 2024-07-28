// Vendors are representations of third party services for which eatinator collects data
// Each Vendor is provided with a means to access Accounts and Records in the database
// On creation, a vendor is provided with a list of actions to take (data to collect) and a relative account
//  to fetch that data with
use crate::account::Account;

pub(crate) trait Vendor {
    fn account(&self) -> &Account;
}
