import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { TamaguiProvider } from "@tamagui/web";
import tamaguiConfig from "../tamagui.config";
import tamaguiResetStyles from '@tamagui/core/reset.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: tamaguiResetStyles }
];

export default function App() {
  let tamaguiStyles = tamaguiConfig.getCSS();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style type="text/css">{tamaguiStyles}</style>
      </head>
      <body>
        <TamaguiProvider config={tamaguiConfig}>
          <Outlet />
        </TamaguiProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
