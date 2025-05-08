import { homedir } from "os";
import { FileStat, Uri, workspace, WorkspaceFolder } from "vscode";

/** Minimal wrapper around {@linkcode workspace.fs.stat} to support testing. */
export async function fsStat(uri: Uri): Promise<FileStat> {
  return await workspace.fs.stat(uri);
}

/**
 * Retrieves the URI of the current workspace folder.
 * If there are no workspace folders, it returns the home directory URI.
 * @returns The URI of the current workspace folder or the home directory URI.
 */
export function getCurrentWorkspaceFolderUri(): Uri {
  let dir: Uri;
  let workspaceFolder: WorkspaceFolder | undefined = workspace.workspaceFolders?.[0];
  if (workspaceFolder) {
    dir = workspaceFolder.uri;
  } else {
    dir = Uri.file(homedir());
  }
  return dir;
}
