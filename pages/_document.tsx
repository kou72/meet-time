import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>📅</text></svg>"
        />
        <meta property="og:title" content="パッとスケジュール" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/kou72/meet-time/main/public/meta.png"
        />
        <meta property="og:description" content="スケジュールを簡単に共有" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
