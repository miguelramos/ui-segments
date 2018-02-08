import {createPackageBuildTasks} from '@segment/tools';
import {
  carbonPackage,
  segmentPackage,
} from './packages';

createPackageBuildTasks(carbonPackage);
createPackageBuildTasks(segmentPackage);

import './tasks/aot';
import './tasks/changelog';
//import './tasks/ci';
import './tasks/clean';
import './tasks/coverage';
import './tasks/default';
import './tasks/development';
//import './tasks/docs';
import './tasks/e2e';
//import './tasks/example-module';
import './tasks/lint';
import './tasks/ui-release';
//import './tasks/payload';
//import './tasks/publish';
//import './tasks/screenshots';
//import './tasks/unit-test';
//import './tasks/universal';
//import './tasks/validate-release';
