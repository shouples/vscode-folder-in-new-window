# Folder in New Window

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/shouples-dev.folder-in-new-window?label=Version)](https://marketplace.visualstudio.com/items?itemName=shouples-dev.folder-in-new-window)
[![VS Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/shouples-dev.folder-in-new-window?label=Installs)](https://marketplace.visualstudio.com/items?itemName=shouples-dev.folder-in-new-window)
[![VS Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/shouples-dev.folder-in-new-window?label=Rating)](https://marketplace.visualstudio.com/items?itemName=shouples-dev.folder-in-new-window&ssr=false#review-details)

[![CI Status](https://github.com/shouples/vscode-folder-in-new-window/actions/workflows/ci.yml/badge.svg)](https://github.com/shouples/vscode-folder-in-new-window/actions/workflows/ci.yml)

## Usage

From the
[Explorer view](https://code.visualstudio.com/docs/getstarted/userinterface#_explorer-view),
right-click on any folder or file, then click `Open Folder in New Window` to launch a new workspace
window with the selected folder as the root.

![image](https://github.com/user-attachments/assets/82a249d5-c9e0-4c23-a3fd-f9e56346f241)

## Note

When running `Open Folder in New Window` from...

- a file, the parent folder will open in a new VS Code window
- a file at the root of the current workspace, nothing will happen unless in a multi-folder
  workspace
- the command palette, a dialogue will appear to select a folder (starting from the current
  workspace root)
