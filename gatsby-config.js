module.exports = {
  pathPrefix: `/friendly-networks`,
  siteMetadata: {
    title: "Friendly Networks",
    description: "Explore the journals and social networks of 18th-century Quakers",
    siteUrl: "https://ds-pages.swarthmore.edu/friendly-networks/",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-theme-ceteicean",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/pid-tei`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content/markdown`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              withWebp: true,
              showCaptions: true,
              quality: 100,
              linkImagesToOriginal: false,
              showCaptions: ["title", "alt"],
              withWebp: true,
              tracedSVG: { color: "#555", turnPolicy: "TURNPOLICY_MAJORITY" },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        sassOptions: {
          includePaths: [
            "./src",
            "node_modules/bootstrap/scss",
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    }
  ],
};
