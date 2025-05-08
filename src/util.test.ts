import * as assert from "assert";
import { homedir } from "os";
import * as sinon from "sinon";
import { Uri, workspace, WorkspaceFolder } from "vscode";
import { getCurrentWorkspaceFolderUri } from "./util";

const TEST_FOLDER: Uri = Uri.file("/path/to/folder");

describe("util.ts", () => {
  let sandbox: sinon.SinonSandbox;

  let workspaceFoldersStub: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    workspaceFoldersStub = sandbox.stub(workspace, "workspaceFolders");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("getCurrentWorkspaceFolderUri() should return a workspace folder Uri when a workspace is loaded", async () => {
    const testWorkspaceFolder: WorkspaceFolder = {
      uri: TEST_FOLDER,
      name: "Test Workspace",
      index: 0,
    };
    workspaceFoldersStub.value([testWorkspaceFolder]);

    const uri: Uri = getCurrentWorkspaceFolderUri();

    assert.strictEqual(uri.toString(), testWorkspaceFolder.uri.toString());
  });

  it("getCurrentWorkspaceFolderUri() should return a root-level Uri when no workspace is loaded", async () => {
    workspaceFoldersStub.value(undefined);

    const uri: Uri = getCurrentWorkspaceFolderUri();

    assert.strictEqual(uri.toString(), Uri.file(homedir()).toString());
  });
});
