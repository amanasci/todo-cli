const program = require('commander')

const {add,ls,del,done,helps,report} = require('./index')


program
    .version('1.0.0')
    .description('Todo app')
    .action(()=>helps())

program
    .command('add <item>')
    .alias('a')
    .description('adds item to list')
    .action(item => add(item))

program
    .command('ls')
    .description('lists all todos')
    .action(()=>ls())

program
    .command('del <index>')
    .description('Use the del command to remove a todo item by its number.')
    .action( ind => del(ind))

program
    .command('done <index>')
    .description('marks as done')
    .action( ind => done(ind))

program
    .command('report')
    .description('Use the report command to see the latest tally of pending and completed todos.')
    .action(()=>report())

program
    .command('help')
    .action(()=>helps())

program.parse(process.argv)
