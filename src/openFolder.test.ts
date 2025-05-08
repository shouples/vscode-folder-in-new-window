import * as assert from "assert";
import * as sinon from "sinon";
import { commands, FileStat, FileType, Uri, window } from "vscode";
import { openFolderInNewWindow } from "./openFolder";
import * as util from "./util";

const TEST_FOLDER: Uri = Uri.file("/path/to/folder");
const TEST_FILE: Uri = Uri.file("/path/to/file.txt");

describe("openFolder.ts", () => {
  let sandbox: sinon.SinonSandbox;

  // stubs for util functions
  let getCurrentWorkspaceFolderUriStub: sinon.SinonStub;
  let fsStatStub: sinon.SinonStub;

  // stubs for vscode APIs
  let showOpenDialogStub: sinon.SinonStub;
  let executeCommandStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    getCurrentWorkspaceFolderUriStub = sandbox.stub(util, "getCurrentWorkspaceFolderUri");
    fsStatStub = sandbox.stub(util, "fsStat");

    showOpenDialogStub = sandbox.stub(window, "showOpenDialog");
    executeCommandStub = sandbox.stub(commands, "executeCommand");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should open selected directory in a new window", async () => {
    const directoryUri = TEST_FOLDER;
    const dirStat: FileStat = { type: FileType.Directory, ctime: 0, mtime: 0, size: 0 };
    fsStatStub.resolves(dirStat);

    await openFolderInNewWindow(directoryUri);

    sinon.assert.calledOnceWithExactly(fsStatStub, directoryUri);
    sinon.assert.calledOnceWithExactly(executeCommandStub, "vscode.openFolder", directoryUri, true);
  });

  it("should open selected file's parent directory in a new window", async () => {
    const fileUri = TEST_FILE;
    const fileStat: FileStat = { type: FileType.File, ctime: 0, mtime: 0, size: 0 };
    const parentUri = Uri.joinPath(fileUri, "..");
    fsStatStub.resolves(fileStat);

    await openFolderInNewWindow(fileUri);

    sinon.assert.calledOnceWithExactly(fsStatStub, fileUri);
    sinon.assert.calledOnceWithExactly(executeCommandStub, "vscode.openFolder", parentUri, true);
  });

  it("should prompt the user to select a folder when invoked outside the Explorer view", async () => {
    const workspaceUri = TEST_FOLDER;
    const selectedUri = TEST_FILE;
    getCurrentWorkspaceFolderUriStub.returns(workspaceUri);
    // simulate user selecting a folder
    showOpenDialogStub.resolves([selectedUri]);

    await openFolderInNewWindow();

    sinon.assert.calledOnce(getCurrentWorkspaceFolderUriStub);
    sinon.assert.calledOnce(showOpenDialogStub);
    assert.deepStrictEqual(showOpenDialogStub.firstCall.args[0], {
      defaultUri: workspaceUri,
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Open Folder in New Window",
    });
    sinon.assert.calledOnceWithExactly(executeCommandStub, "vscode.openFolder", selectedUri, true);
  });

  it("should do nothing when user cancels folder selection dialog", async () => {
    getCurrentWorkspaceFolderUriStub.returns(TEST_FOLDER);
    // simulate user canceling the dialog
    showOpenDialogStub.resolves(undefined);

    await openFolderInNewWindow();

    // Verify dialog was shown but no command was executed
    sinon.assert.calledOnce(getCurrentWorkspaceFolderUriStub);
    sinon.assert.calledOnce(showOpenDialogStub);
    sinon.assert.notCalled(executeCommandStub);
  });

  it("should do nothing when user selects nothing in the folder selection dialog", async () => {
    getCurrentWorkspaceFolderUriStub.returns(TEST_FOLDER);
    // empty selection to simulate user selecting nothing
    showOpenDialogStub.resolves([]);

    await openFolderInNewWindow();

    sinon.assert.calledOnce(getCurrentWorkspaceFolderUriStub);
    sinon.assert.calledOnce(showOpenDialogStub);
    sinon.assert.notCalled(executeCommandStub);
  });
});
