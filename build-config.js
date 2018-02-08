/**
 * Build configuration for the packaging tool. This file will be automatically detected and used
 * to build the different packages inside of UI-Segments.
 */
const {join} = require('path');

const package = require('./package.json');

/** Current version of the project*/
const buildVersion = package.version;

/**
 * Required version for all packages. This version will be used
 * as the peer dependency version for UI-Segment in all release packages.
 */
const segmentVersion = '^1.0.0';

/** License that will be placed inside of all created bundles. */
const buildLicense = `/**
 * @license
 * Copyright UI-Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://ui-segments.io/license
 */`;

module.exports = {
  projectVersion: buildVersion,
  segmentVersion: segmentVersion,
  projectDir: __dirname,
  packagesDir: join(__dirname, 'src'),
  outputDir: join(__dirname, 'dist'),
  licenseBanner: buildLicense
};
