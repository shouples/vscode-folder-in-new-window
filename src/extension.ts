import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let commandDisposable = vscode.commands.registerCommand('folder-in-new-window.open', openFolderInNewWindow);
  context.subscriptions.push(commandDisposable);
}

export function deactivate() {}

/**
 * Handle the command to open a folder in a new window. If a file is selected, open the parent folder.
 * If no item is selected, ask the user to select a folder.
 * @param item The URI of the folder to open in a new window.
 */
async function openFolderInNewWindow(item?: vscode.Uri) {
  let dir: vscode.Uri;
  if (!item) {
    // command invoked from outside the explorer; ask user to select a folder, starting with
    // the current workspace folder
    const currentWorkspaceFolder = getCurrentWorkspaceFolderUri();
    const dirs = await vscode.window.showOpenDialog({
      defaultUri: currentWorkspaceFolder,
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: 'Open Folder(s) in New Window'
    });
    if (!dirs || dirs.length === 0) {
      // nothing selected
      return;
    }
    dir = dirs[0];
  } else {
    // command invoked from the explorer; open the selected folder or the parent folder if a file is selected
    const stat = await vscode.workspace.fs.stat(item);
    if (stat.type === vscode.FileType.Directory) {
      dir = item;
    } else {
      const parentDir = vscode.Uri.joinPath(item, '..');
      dir = parentDir;
    }
  }
  
  await vscode.commands.executeCommand('vscode.openFolder', dir, true);
}

/**
 * Retrieves the URI of the current workspace folder.
 * If there are no workspace folders, it returns the root URI.
 * @returns The URI of the current workspace folder or the root URI.
 */
function getCurrentWorkspaceFolderUri(): vscode.Uri {
  let dir: vscode.Uri;
  let workspaceFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders?.[0];
  if (workspaceFolder) {
    dir = workspaceFolder.uri;
  } else {
    dir = vscode.Uri.file('/');
  }
  return dir;
}