import * as vscode from "vscode";

//
let disposable: vscode.Disposable;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "convertPxToRem" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  disposable = vscode.commands.registerCommand(
    "convert-px-to-rem.convertPxToRem",
    () => {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor;
      let counter = 0;

      if (editor) {
        const selection = editor.selection;
        if (selection.isEmpty) {
          vscode.window.showInformationMessage(
            "No text selected, please select text to convert!"
          );
          return;
        }
        const text = editor.document.getText(selection);
        const regex = /(\d+)px/g;
        const newText = text.replace(regex, (match, p1) => {
          const remValue = (parseInt(p1) / 16).toFixed(2) + "rem";
          counter++;
          return remValue;
        });

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, newText);
        });
      }

      if (counter > 0) {
        vscode.window.showInformationMessage(
          "Text successful converted from px to rem!"
        );
      } else {
        vscode.window.showInformationMessage(
          "No px value found in the selected text!"
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
  if (disposable) {
    disposable.dispose();
  }
}
