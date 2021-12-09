module.exports = {
  siteMetadata: {
    title: "obf",
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
    // `gatsby-plugin-gatsby-cloud`,
    //the elastic search plugin is in this object
    // {
    //   resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
    //   options: {
    //     // Fields to index
    //     fields: [`title`, `tags`],
    //     // How to resolve each field`s value for a supported node type
    //     resolvers: {
    //       // For any node of type MarkdownRemark, list how to resolve the fields` values
    //       MarkdownRemark: {
    //         title: (node) => node.frontmatter.title,
    //         tags: (node) => node.frontmatter.tags,
    //         path: (node) => node.frontmatter.path,
    //       },
    //     },
    //     // Optional filter to limit indexed nodes
    //     filter: (node, getNode) => node.frontmatter.tags !== "exempt",
    //   },
    // },
    // `gatsby-plugin-sitemap`,
    /*
     *setup the site to pull data from the "documents" collection in a local
     * MongoDB instance
     */
    // {
    //   resolve: `gatsby-source-mongodb`,
    //   options: { dbName: `local`, collection: `documents` },
    //   query: { documents: { as_of: { $gte: 1604397088013 } } },
    // },

    "gatsby-theme-ceteicean",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/assets/pid-tei",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/assets/data/md`,
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
              maxWidth: 1500,
              withWebp: true,
              showCaptions: true,
              quality: 100,
              linkImagesToOriginal: false,
              showCaptions: [‘title’, ‘alt’],
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [
            "./src",
            "/Users/zakirhossain/FriendProject/obf/node_modules/bootstrap/scss",
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        duration: 1000,
        offset: -100,
      },
    },
  ],
};
