const log = console.log;

const argv = require('yargs')
    .option('o', {
        alias: 'output',
        describe: 'Output file path with miragejs generated code.',
        type: 'string',
        nargs: 1,
        demand: true,
        demand: 'An output path is required',
        default: './miragejs.js'
    })
    .option('i', {
        alias: 'input',
        describe: 'Input file path with open api specification.',
        type: 'string',
        nargs: 1,
        demand: true,
        demand: 'An input path is required',
    }).argv

function getProcessArguments() {

    if (!argv.input) {
        log("An input file is required")
        process.exit();
    }

    return argv;
}


module.exports = {
    getProcessArguments
}