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