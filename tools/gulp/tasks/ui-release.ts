import {task, src, dest} from 'gulp';
import {join} from 'path';
import {writeFileSync, mkdirpSync} from 'fs-extra';
import {Bundler} from 'scss-bundle';
import {composeRelease, buildConfig, sequenceTask} from '@segment/tools';
import {segmentPackage} from '../packages';

// There are no type definitions available for these imports.
const gulpRename = require('gulp-rename');

const distDir = buildConfig.outputDir;
const {sourceDir, outputDir} = segmentPackage;

/** Path to the directory where all releases are created. */
const releasesDir = join(distDir, 'releases');

// Path to the release output of material.
const releasePath = join(releasesDir, 'ui');
// The entry-point for the scss theming bundle.
const themingEntryPointPath = join(sourceDir, 'core', 'theming', '_all-theme.scss');
// Output path for the scss theming bundle.
const themingBundlePath = join(releasePath, '_theming.scss');
// Matches all pre-built theme css files
const prebuiltThemeGlob = join(outputDir, '**/theming/prebuilt/*.css?(.map)');
// Matches all SCSS files in the different packages.
const allScssGlob = join(buildConfig.packagesDir, '**/*.scss');
// Matches all SCSS files in the different packages.
const allScssLib = join(sourceDir, 'core', '**/*.scss');

/**
 * Overwrite the release task for the material package. The material release will include special
 * files, like a bundled theming SCSS file or all prebuilt themes.
 */
task('ui:build-release', ['ui:prepare-release'], () => composeRelease(segmentPackage));

/**
 * Task that will build the material package. It will also copy all prebuilt themes and build
 * a bundled SCSS file for theming
 */
task('ui:prepare-release', sequenceTask(
  'ui:build',
  ['ui:copy-prebuilt-themes', 'ui:bundle-theming-scss']
));

/** Copies all prebuilt themes into the release package under `prebuilt-themes/` */
task('ui:copy-prebuilt-themes', () => {
  src(prebuiltThemeGlob)
    .pipe(gulpRename({dirname: ''}))
    .pipe(dest(join(releasePath, 'prebuilt-themes')));
});

/** Copies all scss into the release package under `lib-themes/` */
task('ui:copy-lib-themes', () => {
  src(allScssLib)
    .pipe(dest(join(releasePath, 'lib-themes')));
});

/** Bundles all scss requires for theming into a single scss file in the root of the package. */
task('ui:bundle-theming-scss', () => {
  // Instantiates the SCSS bundler and bundles all imports of the specified entry point SCSS file.
  // A glob of all SCSS files in the library will be passed to the bundler. The bundler takes an
  // array of globs, which will match SCSS files that will be only included once in the bundle.
  return new Bundler().Bundle(
    themingEntryPointPath,
    [allScssGlob],
    [join(buildConfig.projectDir, 'node_modules')])
    .then(result => {
    // The release directory is not created yet because the composing of the release happens when
    // this task finishes.
    mkdirpSync(releasePath);
    writeFileSync(themingBundlePath, result.bundledContent);
  });
});
