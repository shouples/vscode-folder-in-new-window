import { FileStat, Uri, workspace } from "vscode";

/** Minimal wrapper around {@linkcode workspace.fs.stat} to support testing. */
export async function fsStat(uri: Uri): Promise<FileStat> {
  return await workspace.fs.stat(uri);
}
