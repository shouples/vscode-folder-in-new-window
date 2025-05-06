import { commands, Disposable, ExtensionContext } from "vscode";
import { openFolderInNewWindow } from "./openFolder";

export function activate(context: ExtensionContext) {
  let commandDisposable: Disposable = commands.registerCommand(
    "folder-in-new-window.open",
    openFolderInNewWindow,
  );
  context.subscriptions.push(commandDisposable);
}

export function deactivate() {}
