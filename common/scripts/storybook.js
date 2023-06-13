const spawn = require('child_process').spawn;

// console.log(__dirname, process.env)
const storybook = spawn('bash');
storybook.stdin.end(`cd "${__dirname}/../autoinstallers/rush-storybook" && rush-pnpm run storybook`);

storybook.stdout.on('data', (data) => {
  console.log(`${data}`);
});

storybook.stderr.on('data', (data) => {
  console.error(`${data}`);
});
