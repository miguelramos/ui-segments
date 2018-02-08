import { BuildPackage, buildConfig } from '@segment/tools';
import { join } from 'path';

export const carbonPackage = new BuildPackage('carbon');
export const segmentPackage = new BuildPackage('ui', [carbonPackage]);

/*export const cdkExperimentalPackage = new BuildPackage('cdk-experimental', [materialPackage]);
export const materialExperimentalPackage = new BuildPackage('material-experimental', [cdkExperimentalPackage]);
export const momentAdapterPackage = new BuildPackage('material-moment-adapter', [materialPackage]);
export const examplesPackage = new BuildPackage('material-examples', [momentAdapterPackage]);*/

// The material package re-exports its secondary entry-points at the root so that all of the
// components can still be imported through `@angular/material`.
segmentPackage.exportsSecondaryEntryPointsAtRoot = true;

// To avoid refactoring of the project the material package will map to the source path `lib/`.
segmentPackage.sourceDir = join(buildConfig.packagesDir, 'ui');

// Some CDK secondary entry-points include SCSS files that should be exposed individually at the
// release output root. This is different in the Material package because here a full SCSS bundle
// will be generated.
carbonPackage.copySecondaryEntryPointStylesToRoot = true;
