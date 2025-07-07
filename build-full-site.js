import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';

const personalSitePath = process.cwd();
const trackerPath = path.resolve(personalSitePath, '../setlist-tracker');
const outputPath = path.join(personalSitePath, 'final-dist');

console.log('📦 Building personal site...');
execSync('npm run build', { cwd: personalSitePath, stdio: 'inherit' });

console.log('📦 Building setlistTracker...');
execSync('npm run build', { cwd: trackerPath, stdio: 'inherit' });

console.log('🚮 Cleaning final-dist...');
await fs.emptyDir(outputPath);

console.log('📁 Copying personal site to final-dist...');
await fs.copy(path.join(personalSitePath, 'dist'), outputPath);

console.log('📁 Copying setlistTracker to final-dist/setlistWizard...');
await fs.copy(path.join(trackerPath, 'dist'), path.join(outputPath, 'setlistWizard'));

console.log('✅ Done! Final site is in final-dist/');