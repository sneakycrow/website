import withData from '../lib/withData';
import { INSERT_GENERAL_PAGE_VIEW_MUTATION } from '../lib/queries';

const trackView = trackedUrl => {
  const regex = /sneakycrow.dev/g;
  const currentURL = window.location.toString() || '';
  if (regex.test(currentURL) && trackedUrl) {
    console.log('tracking view');
    return withData(INSERT_GENERAL_PAGE_VIEW_MUTATION, { url: trackedUrl });
  }
}

export default trackView;
