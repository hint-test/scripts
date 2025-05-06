#!/usr/bin/env node
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = minimist(process.argv.slice(2));
const availableScripts = ['bump-version', 'generate-docs', 'lint-files'];
const scriptName = args._[0];

if (!scriptName || !availableScripts.includes(scriptName)) {
  console.log(`
Usage: npx github:yourusername/your-repo <script-name>

Available scripts:
${availableScripts.map(s => `  - ${s}`).join('\n')}
`);
  process.exit(1);
}

const scriptPath = join(__dirname, `../scripts/${scriptName}.mjs`);

const child = spawn('node', [scriptPath, ...args._.slice(1)], {
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code || 0);
});
