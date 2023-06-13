const exec = require('child_process').exec;
exec('storybook dev -p 6006', {cwd: "common/autoinstallers/rush-storybook"}, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stdout);
    console.log(stderr);
});