module.exports = {
    apps: [
        {
            name: "Delebritex - Web Api",
            script: "./app.js",
            cwd: "./",
            watch: true,
            args: "babel-node ./server.js",
            ignore_watch: ["logs", "node_modules", "tmp"],
        },
    ],
};
