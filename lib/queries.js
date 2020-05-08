export const ALL_ILLUSTRATIONS_QUERY = `
  query GetAllIllustrationsByDate {
    sneaky_illustrations(order_by: {date: desc}) {
      caption
      date
      url
      is_released
    }
  }
`;

export const ALL_PHOTOS_QUERY = `
  query GetAllPhotosOrderByDate {
    sneaky_photos(order_by: { date: desc }) {
      url
      date
      caption
      is_released
    }
  }
`;

export const ALL_POSTS_QUERY = `
  query GetAllPostsOrderByDate {
    sneakycrow_blog(order_by: {published_on: desc}) {
      published_on
      slug
      title
      id
    }
  }
`;

export const createSinglePostQueryBySlug = postSlug => `
  query GetSinglePostBySLUG {
    sneakycrow_blog(where: {slug: {_eq: "${postSlug}"}}) {
      body
      id
      published_on
      slug
      title
    }
  }
`;

export const ALL_SOUNDS_QUERY = `
  query GetAllSoundsOrderByDate {
    sneaky_audio(order_by: {date: desc}) {
      caption
      date
      is_released
      url
    }
  }
`;

export const INSERT_GENERAL_PAGE_VIEW_MUTATION = `
  mutation MyMutation($url: String, $referrer: String) {
    insert_sneaky_views(objects: {url: $url, referrer: $referrer}) {
      affected_rows
    }
  }
`;
