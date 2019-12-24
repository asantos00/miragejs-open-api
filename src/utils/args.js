const argv = require('minimist')(process.argv.slice(2),
    {
        alias: {
            o: 'output',
        },
        default: {
            o: './mirage.js'
        }
    }
);

function getProcessArguments() {
    return argv;
}


module.exports = {
    default: getProcessArguments
}