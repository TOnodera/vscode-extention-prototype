// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
//

const cats = {
  "Coding Cat": "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "Compiling Cat": "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("catCoding.start", () => {
      const panel = vscode.window.createWebviewPanel(
        "catCoding",
        "Cat Coding",
        vscode.ViewColumn.One
      );

      let iteration = 0;
      const updateWebView = () => {
        const cat = iteration++ % 2 ? "Compiling Cat" : "Coding Cat";
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      updateWebView();

      const interval = setInterval(updateWebView, 1000);

      panel.onDidDispose(
        () => {
          clearInterval(interval);
        },
        null,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent(cat: keyof typeof cats) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <img src="${cats[cat]}" width="300" />
  </body>
  </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
