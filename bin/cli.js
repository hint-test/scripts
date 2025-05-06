#!/usr/bin/env node
import { execa } from 'execa';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const scriptName = args._[0]; // 获取用户要运行的脚本名

const availableScripts = ['bump-version', 'generate-docs', 'lint-files'];

if (!scriptName || !availableScripts.includes(scriptName)) {
  console.log(`
Usage: npx github:yourusername/your-repo <script-name>

Available scripts:
  - bump-version
  - generate-docs
  - lint-files
`);
  process.exit(1);
}

// 动态执行对应脚本
await execa('node', [
  `./scripts/${scriptName}.mjs`,
  ...args._.slice(1)
], {
  stdio: 'inherit',
  preferLocal: true
});
