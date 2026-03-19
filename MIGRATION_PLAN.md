# Angular 13 to 17 Migration Plan

A production-safe, step-by-step upgrade guide for migrating the Angular Pokedex application from Angular 13.3.0 to Angular 17.3.x. Each major version is upgraded individually per Angular's official guidance, with validation and rollback points at every step.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Pre-Migration Setup](#pre-migration-setup)
- [Step 1: Angular 13 to 14](#step-1-angular-13-to-14)
- [Step 2: Angular 14 to 15](#step-2-angular-14-to-15)
- [Step 3: Angular 15 to 16](#step-3-angular-15-to-16)
- [Step 4: Angular 16 to 17](#step-4-angular-16-to-17)
- [Post-Migration](#post-migration)
- [Version Summary](#version-summary)
- [Critical Files Modified](#critical-files-modified)
- [Risk Mitigation](#risk-mitigation)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

| Property | Value |
|---|---|
| Application | Angular Pokedex |
| Architecture | NgModule (3 modules, 4 components, 1 service) |
| Styling | SCSS |
| Testing | Karma / Jasmine |
| Deployment | GitHub Pages (`docs/` output directory) |
| Starting Version | Angular 13.3.0, TypeScript 4.6.2 |
| Target Version | Angular 17.3.x, TypeScript 5.4.x |

---

## Prerequisites

### Node.js Requirements

| Angular Version | Minimum Node.js | Recommended |
|---|---|---|
| 14 | 14.15.0 | 16.x or 18.x LTS |
| 15 | 14.20.0 | 18.x LTS |
| 16 | 16.14.0 | 18.x LTS |
| 17 | 18.13.0 | 18.x or 20.x LTS |

> **Note:** Odd-numbered Node.js versions (e.g., v25.x) are not LTS and will produce warnings but function correctly for all Angular versions through 17.

### Before You Begin

- Ensure the working tree is clean (`git status` shows no uncommitted changes)
- Back up or stash any in-progress work
- Verify you can run `ng build` and `ng serve` successfully on the current version
- Review the [Angular Update Guide](https://update.angular.io/) for any app-specific concerns

---

## Pre-Migration Setup

Create a dedicated branch for the migration. Each step will be committed individually so you can roll back to any intermediate version if needed.

```bash
git checkout -b migration/angular-13-to-17
```

---

## Step 1: Angular 13 to 14

### What Changes

| Concern | Before | After |
|---|---|---|
| `@angular/*` | ~13.3.0 | ^14.3.0 |
| `@angular-devkit/build-angular` | ~13.3.7 | ^14.2.13 |
| TypeScript | ~4.6.2 | ~4.6.4 (auto-updated) |
| `angular.json` | has `defaultProject` | **removed by schematic** |
| `tsconfig.json` target | `es2017` | **`ES2022`** (updated by schematic) |

### Breaking Changes

- **None for this project.** No typed forms, no `entryComponents`, no deprecated APIs in use.
- The schematic automatically removes `"defaultProject"` from `angular.json` — the CLI infers the project from the working directory.
- The schematic updates `tsconfig.json` target to `ES2022` and adds `"useDefineForClassFields": false` to preserve Angular decorator behavior.

### Commands

```bash
# Run the update schematic
npx @angular/cli@14 update @angular/core@14 @angular/cli@14 --force

# Clean install to resolve any dependency tree issues
rm -rf node_modules package-lock.json
npm install
```

### Validation

```bash
# Build must succeed
ng build --configuration production

# Smoke test — verify the app renders pokemon data
ng serve
# Open http://localhost:4200 and confirm pokemon list loads

# Run tests (note: pre-existing test failures are acceptable)
ng test --no-watch --browsers=ChromeHeadless
```

### Commit

```bash
git add -A
git commit -m "chore: upgrade Angular 13 to 14"
```

---

## Step 2: Angular 14 to 15

### What Changes

| Concern | Before | After |
|---|---|---|
| `@angular/*` | ^14.3.0 | ^15.2.10 |
| TypeScript | ~4.6.4 | ~4.9.5 |
| zone.js | ~0.11.4 | ~0.11.8 (minor bump) |
| `polyfills` in `angular.json` | `"src/polyfills.ts"` | **`["zone.js"]`** |
| `src/polyfills.ts` | exists | **deleted** |

### Breaking Changes

1. **`polyfills.ts` is eliminated.** The schematic *may* convert `angular.json` polyfills from a file path to an array `["zone.js"]`. If it doesn't (as observed in this migration), you must do it manually.

2. **`tsconfig` files must be updated** — remove `src/polyfills.ts` from `files` arrays in both `tsconfig.app.json` and `tsconfig.spec.json`.

### Commands

```bash
# Run the update schematic
npx @angular/cli@15 update @angular/core@15 @angular/cli@15 --force

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Manual Steps

**Update `angular.json`** — change polyfills in both `build` and `test` sections:

```jsonc
// In architect.build.options:
"polyfills": ["zone.js"],    // was: "src/polyfills.ts"

// In architect.test.options:
"polyfills": ["zone.js"],    // was: "src/polyfills.ts"
```

**Update `tsconfig.app.json`** — remove `src/polyfills.ts` from `files`:

```json
{
  "files": [
    "src/main.ts"
  ]
}
```

**Update `tsconfig.spec.json`** — remove `src/polyfills.ts` from `files`:

```json
{
  "files": [
    "src/test.ts"
  ]
}
```

**Delete `src/polyfills.ts`:**

```bash
rm -f src/polyfills.ts
```

**Verify cleanup:**

```bash
# Should return no results
grep -r "polyfills.ts" tsconfig.app.json tsconfig.spec.json angular.json
```

### Validation

```bash
ng build --configuration production
ng serve
ng test --no-watch --browsers=ChromeHeadless
```

### Commit

```bash
git add -A
git commit -m "chore: upgrade Angular 14 to 15"
```

---

## Step 3: Angular 15 to 16

### What Changes

| Concern | Before | After |
|---|---|---|
| `@angular/*` | ^15.2.10 | ^16.2.12 |
| TypeScript | ~4.9.5 | **~5.4.5** (major bump) |
| zone.js | ~0.11.8 | **~0.13.3** |
| `angular.json` `browserTarget` | present | **renamed to `buildTarget`** |
| `tsconfig.json` module | `es2020` | **`es2022`** (recommended) |

### Breaking Changes

1. **TypeScript 4.x to 5.x.** The schematic handles the version bump. Since `target` was already set to `ES2022` (from step 1), `useDefineForClassFields: false` is already in place — **no additional action needed**.

2. **`browserTarget` renamed to `buildTarget`** in `angular.json` serve/extract-i18n configurations. The schematic does this automatically.

3. **Dev dependencies need updating** — test tooling packages should be bumped to versions compatible with Angular 16.

### Commands

```bash
# Run the update schematic
npx @angular/cli@16 update @angular/core@16 @angular/cli@16 --force

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Manual Steps

**Update `tsconfig.json`** — set `module` to `es2022`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "es2022",
    "useDefineForClassFields": false
  }
}
```

**Update dev dependencies:**

```bash
npm install --save-dev \
  @types/jasmine@~5.1.0 \
  @types/node@^18.0.0 \
  jasmine-core@~5.1.0 \
  karma@~6.4.0 \
  karma-chrome-launcher@~3.2.0 \
  karma-coverage@~2.2.0 \
  karma-jasmine@~5.1.0 \
  karma-jasmine-html-reporter@~2.1.0
```

### Validation

```bash
ng build --configuration production
ng serve
ng test --no-watch --browsers=ChromeHeadless
```

### Commit

```bash
git add -A
git commit -m "chore: upgrade Angular 15 to 16"
```

---

## Step 4: Angular 16 to 17

This is the most involved step. Angular 17 introduces a new build system (esbuild/Vite) that replaces webpack.

### What Changes

| Concern | Before | After |
|---|---|---|
| `@angular/*` | ^16.2.12 | **^17.3.12** |
| TypeScript | ~5.4.5 | ~5.4.5 (same) |
| zone.js | ~0.13.3 | **~0.14.10** |
| Build system | webpack (`browser` builder) | **esbuild/Vite (`application` builder)** |
| `HttpClientModule` | used in `app.module.ts` | **deprecated, replaced with `provideHttpClient()`** |
| `src/test.ts` | exists | **deleted** (Karma auto-discovers) |
| npm `overrides` | webpack security patches | **removed** (esbuild doesn't use webpack) |

### Breaking Changes

1. **Build system migration** — The `browser` builder is replaced by the `application` builder. This requires several changes to `angular.json`.
2. **`HttpClientModule` is deprecated** — still functional, but should be replaced with `provideHttpClient()`.
3. **`src/test.ts` can be removed** — Karma in Angular 17 auto-discovers test files.
4. **npm `overrides` for webpack vulnerabilities** — no longer needed since esbuild replaces webpack.

### Commands

```bash
# Run the update schematic
npx @angular/cli@17 update @angular/core@17 @angular/cli@17 --force

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Manual Steps

#### 1. Update `angular.json` — Build System Migration

**Change the builder:**

```jsonc
// Was:
"builder": "@angular-devkit/build-angular:browser",

// Now:
"builder": "@angular-devkit/build-angular:application",
```

**Rename `main` to `browser`:**

```jsonc
// Was:
"main": "src/main.ts",

// Now:
"browser": "src/main.ts",
```

**Update `outputPath` for GitHub Pages compatibility:**

```jsonc
// Was:
"outputPath": "docs",

// Now:
"outputPath": {
  "base": "docs",
  "browser": ""
},
```

> **Critical:** Without `"browser": ""`, the output goes to `docs/browser/` which breaks GitHub Pages deployment. The empty string ensures files are output directly to `docs/`.

**Remove unsupported options from `development` configuration:**

Remove these three options (not supported by the `application` builder):
- `buildOptimizer`
- `vendorChunk`
- `namedChunks`

Keep `optimization`, `extractLicenses`, and `sourceMap` — they are still valid.

```jsonc
"development": {
  "optimization": false,
  "extractLicenses": false,
  "sourceMap": true
}
```

**Remove `main` from test configuration** (since `src/test.ts` is deleted):

```jsonc
// In architect.test.options, remove:
"main": "src/test.ts",
```

#### 2. Update `src/app/app.module.ts`

Replace `HttpClientModule` with `provideHttpClient()`:

```typescript
// Before:
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PokedexDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// After:
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokedexDashboardModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
```

#### 3. Clean Up Remaining Files

**Delete `src/test.ts`:**

```bash
rm -f src/test.ts
```

**Update `tsconfig.spec.json`** — remove `src/test.ts` from `files`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

#### 4. Remove npm Overrides

Remove the entire `overrides` section from `package.json`:

```jsonc
// Delete this block:
"overrides": {
  "loader-utils": "^2.0.4",
  "minimatch": "^3.1.2",
  "decode-uri-component": "^0.2.2",
  "json5": "^2.2.3"
},
```

Then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Validation

```bash
# Build with the new esbuild builder
ng build --configuration production

# CRITICAL: Verify GitHub Pages output structure
ls docs/index.html    # Must exist at docs root, NOT in docs/browser/

# Smoke test
ng serve
# Open http://localhost:4200 and verify pokemon list renders correctly

# Run tests
ng test --no-watch --browsers=ChromeHeadless
```

### Commit

```bash
git add -A
git commit -m "chore: upgrade Angular 16 to 17"
```

---

## Post-Migration

### Merge to Main

```bash
git checkout main
git merge migration/angular-13-to-17
git push origin main
```

### Verify Deployment

After pushing, confirm that GitHub Pages serves the app correctly from the `docs/` directory.

### Run `npm audit`

```bash
npm audit
```

Review any remaining vulnerabilities. With esbuild replacing webpack, most historical audit issues should be resolved.

---

## Version Summary

| Step | Angular | TypeScript | zone.js | Build System | Key Change |
|---|---|---|---|---|---|
| Start | 13.3.0 | 4.6.2 | 0.11.4 | webpack | — |
| 13 → 14 | 14.3.0 | 4.6.4 | 0.11.4 | webpack | `defaultProject` removed, target → ES2022 |
| 14 → 15 | 15.2.10 | 4.9.5 | 0.11.8 | webpack | `polyfills.ts` eliminated |
| 15 → 16 | 16.2.12 | 5.4.5 | 0.13.3 | webpack | TypeScript 5.x, `browserTarget` → `buildTarget` |
| 16 → 17 | 17.3.12 | 5.4.5 | 0.14.10 | **esbuild/Vite** | New build system, `provideHttpClient()` |

---

## Critical Files Modified

| File | Steps Modified | Changes |
|---|---|---|
| `package.json` | 1, 2, 3, 4 | Dependencies updated every step; overrides removed at step 4 |
| `angular.json` | 1, 2, 3, 4 | `defaultProject` removed (1); polyfills array (2); `buildTarget` (3); `application` builder (4) |
| `tsconfig.json` | 1, 3 | target → ES2022 + `useDefineForClassFields` (1); module → es2022 (3) |
| `tsconfig.app.json` | 2 | `polyfills.ts` removed from `files` |
| `tsconfig.spec.json` | 2, 4 | `polyfills.ts` removed (2); `test.ts` removed (4) |
| `src/polyfills.ts` | 2 | **Deleted** |
| `src/test.ts` | 4 | **Deleted** |
| `src/app/app.module.ts` | 4 | `HttpClientModule` → `provideHttpClient()` |

---

## Risk Mitigation

### General Principles

- **One major version at a time.** Never skip versions. Angular schematics are designed for single-version hops and won't run correctly otherwise.
- **Commit after each step.** Each version upgrade gets its own commit, providing clean rollback points.
- **Use `--force` flag.** Peer dependency conflicts are expected during major upgrades. The `--force` flag allows the update to proceed despite them.
- **Clean install between steps.** `rm -rf node_modules package-lock.json && npm install` ensures no stale dependencies persist.
- **Build validates each step.** A successful `ng build --configuration production` confirms the upgrade didn't break compilation.

### Rollback Strategy

If a step fails and cannot be resolved:

```bash
# See all migration commits
git log --oneline

# Roll back to the last successful step
git reset --hard <commit-hash>

# Or revert the entire migration
git checkout main
git branch -D migration/angular-13-to-17
```

### Common Pitfalls

| Pitfall | Prevention |
|---|---|
| Dirty working tree blocks `ng update` | Always commit or stash before running update schematics |
| `polyfills.ts` not auto-converted (step 2) | Manually update `angular.json` and delete the file |
| Missing `useDefineForClassFields: false` | Angular decorators break silently; the step 1 schematic adds this, but verify |
| `docs/browser/` subfolder (step 4) | Set `"browser": ""` in `outputPath` or GitHub Pages will 404 |
| npm `overrides` conflict with esbuild | Remove the entire `overrides` block at step 4 |
| IDE shows "Cannot find type definition" warnings | Harmless; caused by transitive `@types/*` packages — does not affect builds |

---

## Troubleshooting

### `Repository is not clean` Error

The `ng update` command requires a clean git working tree. Commit or stash all changes before running it.

```bash
git stash --include-untracked
# Run the update
git stash pop  # After committing the upgrade
```

### Build Fails After Upgrade

1. Delete `node_modules` and `package-lock.json`, then reinstall
2. Check for TypeScript errors — version jumps can surface previously hidden issues
3. Compare your `angular.json` against the expected state for that Angular version

### Tests Fail After Upgrade

Pre-existing test failures (e.g., missing `HttpClientModule` in test beds, undeclared components) are **not caused by the migration**. Address these separately from the upgrade.

### `outputPath` Produces Wrong Structure

If `docs/browser/index.html` exists instead of `docs/index.html`, your `outputPath` configuration is wrong. Use:

```json
"outputPath": {
  "base": "docs",
  "browser": ""
}
```
