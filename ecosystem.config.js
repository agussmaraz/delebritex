module.exports = {
    apps: [
        {
            name: "Delebritex - Web Api",
            script: "./app.js",
            cwd: "./",
            watch: true,
            interpreter: "./node_modules/babel-cli/bin/babel-node.js",
            ignore_watch: ["logs", "node_modules", "tmp"],
        },
    ],
};
