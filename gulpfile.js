const { Indexer, Packager } = require("@vesta/devmaid");
const gulp = require("gulp")

let pkgr = new Packager({
    root: __dirname,
    src: "src",
    targets: ["es6"],
    files: [".npmignore", "LICENSE", "README.md"],
    publish: "--access=public",
});

function indexer() {
    const indexer = new Indexer("src");
    indexer.generate();
    return Promise.resolve();
}

function watch() {
    gulp.watch(`src/**/*`, indexer);
    return Promise.resolve();
}

const tasks = pkgr.createTasks();
module.exports = {
    default: gulp.series(indexer, tasks.default, watch),
    publish: gulp.series(indexer, tasks.deploy, tasks.publish)
}
