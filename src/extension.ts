import * as vscode from "vscode";
import { getUri } from "./utilities/getUri";
import { getNonce } from "./utilities/getNonce";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("sgc.start", () => {
    const extensionUri = context.extensionUri;
    vscode.window.showInformationMessage("start simple-graphql-client🚀");
    const panel = vscode.window.createWebviewPanel(
      "react.js",
      "React.js",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "webview-ui/dist"),
        ],
      }
    );

    panel.webview.html = _getWebviewContent(panel.webview, extensionUri);
  });
  context.subscriptions.push(disposable);
}

function _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
  // The CSS file from the React build output
  const stylesUri = getUri(webview, extensionUri, [
    "webview-ui",
    "dist",
    "assets",
    "index.css",
  ]);
  // The JS file from the React build output
  const scriptUri = getUri(webview, extensionUri, [
    "webview-ui",
    "dist",
    "assets",
    "index.js",
  ]);

  const nonce = getNonce();

  // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
  return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Hello World</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
}

export function deactivate() {}
