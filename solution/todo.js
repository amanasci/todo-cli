const program = require('commander')

const {add,ls,del,done,helps,report} = require('./index')


program
    .version('1.0.0')
    .description('Todo app')
    .action(()=>helps())

program
    .command('add [item]')
    .alias('a')
    .description('adds item to list')
    .action(item => {
        if(!item){
            console.log("Error: Missing todo string. Nothing added!")
        }
        else{
            add(item)
        }
    })

program
    .command('ls')
    .description('lists all todos')
    .action(()=>ls())

program
    .command('del [index]')
    .description('Use the del command to remove a todo item by its number.')
    .action( ind =>{
        if(!ind){
            console.log('Error: Missing NUMBER for deleting todo.')
        }
        else{
            del(ind)
        }
    })

program
    .command('done [index]')
    .description('marks as done')
    .action( ind => {
        if(!ind){
            console.log(`Error: Missing NUMBER for marking todo as done.`)
        }
        else{
            done(ind)
        }
    })

program
    .command('report')
    .description('Use the report command to see the latest tally of pending and completed todos.')
    .action(()=>report())

program
    .command('help')
    .action(()=>helps())

program.parse(process.argv)
