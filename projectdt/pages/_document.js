import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const bodyStyle = {
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
  };

  return (
    <Html lang="en">
      <Head />
      <body style={bodyStyle}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
