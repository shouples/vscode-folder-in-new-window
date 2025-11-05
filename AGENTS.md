# Agent Guidelines for vscode-folder-in-new-window

## Repository Overview
This project contains a VS Code extension written in TypeScript. Tests are implemented with Mocha and leverage the VS Code test runner utilities.

## General Development Guidance
- Follow the existing TypeScript coding style: prefer named exports, maintain explicit return types when practical, and keep functions small and focused.
- When adding or updating tests, place them alongside the related implementation file (e.g., `src/feature.ts` with `src/feature.test.ts`).
- Keep documentation in sync with functional changes, especially the extension activation workflow described in `README.md`.

## Testing Expectations
- Run `npm test` after making changes that could affect behaviour.
- If your changes affect the build output or require compilation, ensure `npm run compile` succeeds before submission.

## PR Message Notes
- Summaries should call out both user-facing behaviour and developer-facing improvements when applicable.
- Reference any notable testing that was performed so reviewers can reproduce it easily.

