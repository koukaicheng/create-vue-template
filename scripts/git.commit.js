#!/usr/bin/env node

const fs = require('fs');

const chalk = require('chalk');

const gitParams = process.env.HUSKY_GIT_PARAMS || '.git/COMMIT_EDITMSG';
const prefixes = [
  'feat',
  'fix',
  'docs',
  'merge',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];

const commitRE = new RegExp(`^(${prefixes.join('|')}): .{1,50}`);
const similarRE = /(^[a-zA-Z]+):/;
chalk.level = 1;
let message = fs.readFileSync(gitParams, 'utf-8').trim();
const commitPrefixOption = {
  feat: '    新增功能',
  fix: '     修复了一些 bug',
  docs: '    更新了一下文档',
  merge: '   合并某个分支的代码(解决冲突)',
  style: '   不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)',
  refactor: '重构已有模块代码',
  perf: '    性能, 体验优化',
  test: '    新增测试用例或是更新现有测试',
  build: '   主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交',
  ci: '      主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交',
  chore: '   不属于以上类型的其他类，比如构建流程, 依赖管理',
  revert: '  回滚某个更早之前的提交',
};

if (!commitRE.test(message)) {
  console.log(chalk.bold.red(`\nGIT信息提交失败：\n`));
  let matcher;
  matcher = message.match(similarRE);
  if (matcher) {
    if (prefixes.indexOf(matcher[1]) === -1) {
      console.log(chalk.bold.red(`原因：前缀关键字 ”${matcher[1]}“ 不合法\n`));
      console.log(chalk.bold('  合法的前缀关键字如下：\n'));

      prefixes.forEach((prefix) => {
        console.log(`    ${chalk.bold(prefix)}: ${chalk.green(commitPrefixOption[prefix])}`);
      });

      console.log(chalk.bold('\n您想使用的前缀关键字可能是：\n'));

      prefixes.forEach((target) => {
        compare(target, matcher[1]) && console.log(chalk.bold(`\t${target}`));
      });
    } else {
      message = message.substr(matcher[0].length);

      if (!message) {
        console.log(chalk.bold.red('原因：提交信息内容不能为空。\n'));
        console.log(chalk.bold('正确的提交格式应该为：\n'));
        console.log(chalk.green.bold(matcher[0] + ' 您提交的信息'));
      } else if (message.substr(0, 1) !== ' ') {
        console.log(chalk.red.bold('原因：前缀关键字和内容之间缺少空格。\n'));
        console.log(chalk.bold('正确的提交格式应该为：\n'));
        console.log(chalk.green.bold(matcher[0] + ` ${message}`));
      } else {
        message = message.substr(1);
        message.length > 50 && console.log(chalk.red('原因：提交日志内容不得超过五十个字符。'));
      }
    }
  } else {
    console.log(chalk.bold.red(`原因：缺少提交前缀关键字。\n`));
    console.log(chalk.bold('  合法的前缀关键字如下：\n'));
    prefixes.forEach((prefix) => {
      console.log(`    ${chalk.bold(prefix)}: ${chalk.green(commitPrefixOption[prefix])}`);
    });
  }
  process.exit(1);
}
function compare(source, target) {
  const letters = target.split(/\B/);
  let matchTimes = 0;
  return letters.some((t) => {
    source.includes(t) && matchTimes++;
    return matchTimes > 2;
  });
}
