import withData from '../lib/withData';
import { INSERT_GENERAL_PAGE_VIEW_MUTATION } from '../lib/queries';

const trackView = trackedUrl => {
  const regex = /sneakycrow.dev/g;
  const currentURL = window.location.toString() || '';
  const referrerURL = document.referrer?.length > 0 ? document.referrer : null;
  if (regex.test(currentURL) && trackedUrl) {
    return withData(INSERT_GENERAL_PAGE_VIEW_MUTATION, { url: trackedUrl, referrer: referrerURL });
  }
}

export default trackView;
