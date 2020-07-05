import React from "react";
import Layout from "../src/layout";

export default function RenderUI({ content, state }) {
  return (
    <>
      <Layout>{content}</Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </>
  );
}
