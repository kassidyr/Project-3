export const LAUNCHES_QUERY = `
query {
  launches(limit: 30) {
    id
    mission_name
    launch_site {
      site_name_long
      site_name
    }
    rocket {
      rocket_name
    }
    launch_date_utc
    links {
      article_link
      flickr_images
    }
  }
}
`

export const LAUNCH_QUERY = `
query getLaunch($id: ID!) {
  launch(id: $id) {
    id
    mission_name
    launch_site {
      site_name_long
    }
    rocket {
      rocket_name
    }
    launch_date_utc
    links {
      article_link
      flickr_images
    }
  }
}


`
