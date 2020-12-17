const program = require('commander')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const {add,ls,del,done, helps} = require('./index')

db.defaults({ list: []})
  .write()



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
    .command('help')
    .action(()=>helps())

program.parse(process.argv)
