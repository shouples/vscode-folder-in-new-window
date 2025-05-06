import { commands, FileStat, FileType, Uri, window, workspace, WorkspaceFolder } from "vscode";
import { fsStat } from "./util";

/**
 * Handle the command to open a folder in a new window.
 *
 * - If a file is selected, open the parent folder.
 * - If no item is selected, ask the user to select a folder.
 * @param item The URI of the folder to open in a new window.
 */
export async function openFolderInNewWindow(item?: Uri) {
  let dir: Uri;
  if (!item) {
    // command invoked from outside the explorer; ask user to select a folder, starting with
    // the current workspace folder
    const currentWorkspaceFolder: Uri = getCurrentWorkspaceFolderUri();
    const dirs: Uri[] | undefined = await window.showOpenDialog({
      defaultUri: currentWorkspaceFolder,
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Open Folder in New Window",
    });
    if (!dirs || dirs.length === 0) {
      // nothing selected
      return;
    }
    dir = dirs[0];
  } else {
    // command invoked from the explorer; open the selected folder or the parent folder if a file is
    // selected
    const stat: FileStat = await fsStat(item);
    if (stat.type === FileType.Directory) {
      dir = item;
    } else {
      const parentDir = Uri.joinPath(item, "..");
      dir = parentDir;
    }
  }

  // "true" indicates a new window will be opened - for the purpose of this extension, we never want
  // it to be false
  await commands.executeCommand("vscode.openFolder", dir, true);
}

/**
 * Retrieves the URI of the current workspace folder.
 * If there are no workspace folders, it returns the root URI.
 * @returns The URI of the current workspace folder or the root URI.
 */
export function getCurrentWorkspaceFolderUri(): Uri {
  let dir: Uri;
  let workspaceFolder: WorkspaceFolder | undefined = workspace.workspaceFolders?.[0];
  if (workspaceFolder) {
    dir = workspaceFolder.uri;
  } else {
    dir = Uri.file("/");
  }
  return dir;
}
