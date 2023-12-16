/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Typebot docs',
  tagline: 'Get to Typebot next level with its documentation',
  url: 'https://docs.facto.com.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'baptisteArno', // Usually your GitHub org/user name.
  themeConfig: {
    navbar: {
      title: 'Typebot',
      logo: {
        alt: 'Typebot Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: '/',
          label: 'Docs',
          position: 'left',
        },
        {
          href: '/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          href: 'https://github.com/xu-ryan/typebot.io/tree/facto/apps/docs',
          label: 'Contribute',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: '978429d40094dc0fd2dd02db741b3dbe',
      indexName: 'typebot',
      appId: '6GBQ91COKA',
      contextualSearch: false,
    },
    footer: {
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'Homepage',
              to: 'https://bot.facto.com.cn',
            },
            { label: 'Status', to: 'https://status.facto.com.cn' },
            {
              label: 'Roadmap',
              to: 'https://app.facto.com.cn/feedback',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://bot.facto.com.cn/discord',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/facto_hk',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://bot.facto.com.cn/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              href: 'https://bot.facto.com.cn/privacy-policies',
            },
          ],
        },
      ],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@typebot.io/docusaurus-preset-openapi',
      /** @type {import('@typebot.io/docusaurus-preset-openapi').Options} */
      {
        api: {
          path: 'openapi',
          routeBasePath: '/api',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: ({ docPath }) => {
            return `https://github.com/xu-ryan/typebot.io/edit/facto/apps/docs/docs/${docPath}`
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
