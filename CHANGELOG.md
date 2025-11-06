# Change Log

All notable changes to this extension will be documented in this file.

## Unreleased

## 0.7.1

### Fixed

- Corrected the `when` clause for editor context menu commands to use `isFileSystemResource`,
  ensuring that the "Open Folder in New Window" command appears for file system resources regardless
  of URI scheme.

## 0.7.0

### Added

- Exposed "Open Folder in New Window" command from editor context and title menus.

## 0.6.0

### Added

- Keybinding support for `Shift+Alt+N`/`Shift+Opt+N` to trigger the main command for opening a new
  window.
- Mocha tests with `sinon`
- GitHub Actions workflows for testing and releases

### Fixed

- Replaced the old extension icon with a smaller one to shrink the package size.

## 0.5.1 - 0.5.2

- Minor formatting changes and typo fixes to package description and README.

## 0.5.0

- Initial release
