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
        describe: 'Input file path/url with open api specification.',
        type: 'string',
        nargs: 1,
        demand: true,
        demand: 'An input path/url is required',
    }).argv

function getProcessArguments() {
    return argv;
}


module.exports = {
    getProcessArguments
}