const log = console.log;

const argv = require('minimist')(process.argv.slice(2),
    {
        alias: {
            o: 'output',
            i: 'input',
        },
        default: {
            o: './mirage.js'
        }
    }
);

function getProcessArguments() {

    if (!argv.input) {
        log("An input file is required")
    }

    return argv;
}


module.exports = {
    getProcessArguments
}