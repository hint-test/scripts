#!/usr/bin/env node
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 动态计算主脚本路径
const __dirname = dirname(fileURLToPath(import.meta.url));
const mainScript = join(__dirname, '../scripts/bump-version.mjs');

// 使用 Node.js 的模块加载器运行 ESM 脚本
import(mainScript).catch(err => {
  console.error('Failed to run bump-version:', err);
  process.exit(1);
});
