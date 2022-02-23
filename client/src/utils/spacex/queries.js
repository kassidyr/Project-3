export const LAUNCHES_QUERY = `
query {
  launches(limit: 12) {
    id
    mission_name
    details
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
      video_link
    }
  }
}
`

export const LAUNCH_QUERY = `
query getLaunch($id: ID!) {
  launch(id: $id) {
    id
    mission_name
    details
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
      video_link
    }
  }
}


`
