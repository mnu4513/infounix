import Document, { Html, Head, Main, NextScript } from "next/document";

const themeSnippet = `(function(){
  try {
    var s = localStorage.getItem('theme');
    if (s) document.documentElement.setAttribute('data-theme', s);
    else {
      var prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefers ? 'dark' : 'light');
    }
  } catch (e) {}
})();`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* run before React loads to prevent flash */}
          <script dangerouslySetInnerHTML={{ __html: themeSnippet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
