// Adapted from the Gatsby "Adding an SEO component" how-to page, 2022-08-29

import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export const SEO = ({ title, description, pathname, children }) => {
  // Import site metadata
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
  `)
  const metadata = data.site.siteMetadata
  // Unpack data from static query
  const { title: defaultTitle, description: defaultDescription, siteUrl } = metadata

  // Assign vars either w/ values passed as props or w/ defaults from metadata
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>{seo.title}</title>
       <meta name="description" content={seo.description} />
    </>
  )

}
