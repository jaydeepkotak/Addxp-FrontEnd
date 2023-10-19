export const DIRECTOR_MESSAGE = `
  query professionalSearch(
    $queryType: String!
    $text: String!
    $specialities: String!
    $locations: String!
    $positions: String!
    $alphabet: String!
    $page: Int!
  ) {
    search(
      queryType: $queryType
      text: $text
      specialities: $specialities
      locations: $locations
      positions: $positions
      alphabet: $alphabet
      page: $page
    ) {
      viewAllCount
      page
      pageSize
      totalPages
      resultSets {
        pageTitle
        title
        explore
        image
        specification
        description
        date
      }
    }
  }
`;
