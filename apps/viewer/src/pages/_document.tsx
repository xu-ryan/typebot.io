/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html translate="no">
    <Head>
      <script src="/__ENV.js" />
      <script src="https://www.facto.com.cn/assets/jquery.min.js" />
      <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" />
      <script src="/typebot.js" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
