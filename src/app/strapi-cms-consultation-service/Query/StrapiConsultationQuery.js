export const GO_STRAPI_QUERY = `
query{
  strapiConsultation{
    data{
      id
      attributes{
        go_strapi{
          data{
            id
            attributes{
              RelationTitle
              StrapiDesc{
                id
								Title
                SubTitle
                 Body
                Description
                Images{
                  data{
                    id
                    attributes
                    {
                      url
                      alternativeText
                    }
                  }
                }
              }
              Details{
                id
                Title
                Description
                Number
              }
            }
          }
        }
      }
    }
  }
}`;
export const CALENDER_QUERY = `
query{
  strapiConsultation{
    data{
      id
      attributes{
        calender{
          data{
            id
            attributes{
              MainTitle{
                id
                Title
                Description
              }
            }
          }
        }
      }
    }
  }
}
`;
