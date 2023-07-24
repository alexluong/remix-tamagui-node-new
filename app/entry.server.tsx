/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import tamaguiConfig from "../tamagui.config";

if (typeof globalThis.process === "undefined") {
  // @ts-ignore
  globalThis.process = { env: {} };
}
process.env.TAMAGUI_TARGET = "web";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  let tamaguiStyles = tamaguiConfig.getCSS();

  markup = markup.replace("__STYLES__", `<style>${tamaguiStyles}</style>`);
  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
