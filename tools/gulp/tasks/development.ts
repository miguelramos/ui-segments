import {task} from 'gulp';
import {tsBuildTask, copyTask, serverTask} from '../util/task_helpers';
import {join} from 'path';
import {
  buildConfig, copyFiles, buildScssTask, sequenceTask, watchFiles
} from '@segment/tools';
import {
  carbonPackage,
  segmentPackage
} from '../packages';

// These imports don't have any typings provided.
// const firebaseTools = require('firebase-tools');

const {outputDir, packagesDir, projectDir} = buildConfig;

/** Path to the directory where all bundles live. */
const bundlesDir = join(outputDir, 'bundles');

const appDir = join(packagesDir, 'demo-app');
const outDir = join(outputDir, 'packages', 'demo-app');

/** Array of vendors that are required to serve the demo-app. */
const appVendors = [
  '@angular',
  'systemjs',
  'zone.js',
  'rxjs',
  'hammerjs',
  'core-js',
  'web-animations-js',
  'tslib',
];

/** Glob that matches all required vendors for the demo-app. */
const vendorGlob = `+(${appVendors.join('|')})/**/*.+(html|css|js|map)`;

/** Glob that matches all assets that need to be copied to the output. */
const assetsGlob = join(appDir, `**/*.+(html|css|svg|ico)`);

task(':watch:devapp', () => {
  watchFiles(join(appDir, '**/*.ts'), [':build:devapp:ts'], true);
  watchFiles(join(appDir, '**/*.scss'), [':build:devapp:scss'], true);
  watchFiles(join(appDir, '**/*.html'), [':build:devapp:assets'], true);

  // Custom watchers for all packages that are used inside of the demo-app. This is necessary
  // because we only want to build the changed package (using the build-no-bundles task).
  watchFiles(join(carbonPackage.sourceDir, '**/*'), ['carbon:build-no-bundles'], true);
  watchFiles(join(segmentPackage.sourceDir, '**/!(*.scss)'), ['ui:build-no-bundles'], true);
  watchFiles(join(segmentPackage.sourceDir, '**/*.scss'), [':build:devapp:ui-with-styles'], true);
});

/** Path to the demo-app tsconfig file. */
const tsconfigPath = join(appDir, 'tsconfig-build.json');

task(':build:devapp:ts', tsBuildTask(tsconfigPath));
task(':build:devapp:scss', buildScssTask(outDir, appDir));
task(':build:devapp:assets', copyTask(assetsGlob, outDir));

task(':serve:devapp', serverTask(outDir, true));

// The themes for the demo-app are built by using the SCSS mixins from Material.
// Therefore when SCSS files have been changed, the custom theme needs to be rebuilt.
task(':build:devapp:ui-with-styles', sequenceTask(
  'ui:build-no-bundles', ':build:devapp:scss'
));

task('build:devapp', sequenceTask(
  'carbon:build-no-bundles',
  'ui:build-no-bundles',
  [':build:devapp:assets', ':build:devapp:scss', ':build:devapp:ts']
));

task('serve:devapp', ['build:devapp'], sequenceTask([':serve:devapp', ':watch:devapp']));

/** Task that copies all vendors into the demo-app package. Allows hosting the app on firebase. */
task('stage-deploy:devapp', ['build:devapp'], () => {
  copyFiles(join(projectDir, 'node_modules'), vendorGlob, join(outDir, 'node_modules'));
  copyFiles(bundlesDir, '*.+(js|map)', join(outDir, 'dist/bundles'));
  copyFiles(carbonPackage.outputDir, '**/*.+(js|map)', join(outDir, 'dist/packages/carbon'));
  copyFiles(segmentPackage.outputDir, '**/*.+(js|map)', join(outDir, 'dist/packages/ui'));
  copyFiles(segmentPackage.outputDir, '**/prebuilt/*.+(css|map)', join(outDir, 'dist/packages/ui'));
});

/**
 * Task that deploys the demo-app to Firebase. Firebase project will be the one that is
 * set for project directory using the Firebase CLI.
 */
/*task('deploy:devapp', ['stage-deploy:devapp'], () => {
  return firebaseTools.deploy({cwd: projectDir, only: 'hosting'})
    // Firebase tools opens a persistent websocket connection and the process will never exit.
    .then(() => { console.log('Successfully deployed the demo-app to firebase'); process.exit(0); })
    .catch((err: any) => { console.log(err); process.exit(1); });
});*/
