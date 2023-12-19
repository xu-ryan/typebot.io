/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Typebot docs',
  tagline: 'Get to Typebot next level with its documentation',
  url: 'https://docs.facto.com.cn',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'Facto', // Usually your GitHub org/user name.
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
          href: 'mailto:hi@facto.hk',
          label: 'Feedback',
          position: 'right',
        },
      ],
    },
        algolia: {
      apiKey: '04153e63e640c31bfa885f0b1601bf87',
      indexName: 'typebot',
      appId: '35SZIZ28TH',
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
