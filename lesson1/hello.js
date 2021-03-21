const chalk = require('chalk');
var say = require('say');
const log = console.log;

log(chalk.blue('Hello') + ' World' + chalk.red('!'));
log(chalk.blue.bgRed('Hello world!'));
log(chalk.yellow.bold('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

say.speak('Hello, how are you today?', (err) => {
if (err) {
return console.error(err);
}
console.log('Text has been spoken.');
});