var fs = require("fs")

const todopath = './todo.txt'
const donepath = './done.txt'


function add(item){
    try {
        if (fs.existsSync(todopath)) {
        fs.appendFile( todopath, item+"\n", (error) => {
            if(error) throw error
            console.log(`Added todo: \"${item}\"`)
        })
        }
        else{
            fs.writeFile(todopath,"",(err)=>{
                if(err) throw err
                add(item)
            })
        }
    } catch(err) {
        console.error(err)
    }
}

function ls() {
    try {
        if (fs.existsSync(todopath)) {
        fs.readFile( todopath, (error, data) => {
            if(error) throw error
            var arr = data.toString().split("\n")
            arr.slice().reverse().forEach((ele,index) => {
                if(ele){
                    console.log(`[${arr.length - index}] ${ele}`)
                    
                }
            });
            
        })
        }
        else{
            console.log("No pending tasks.")
        }
    } catch(err) {
        console.error(err)
    }
}

function del(ind){
    
    try {
        if (fs.existsSync(todopath)) {
        fs.readFile( todopath, (error,data) => {
            if(error) throw error
            arr = data.toString().split("\n")
            if (ind < arr.length){
                arr.splice(ind-1, 1)
                fs.writeFile(todopath, arr.join("\n"),(err) => {
                    if(err) throw err
                    console.log(`Deleted todo #${ind}`)
                } )
            }
            else{
                console.log(`Error: todo #${ind} does not exist.Nothing deleted.`)
            }
        })
        
        }
    } catch(err) {
        console.error(err)
    }
}

function done(ind){
    try {
        if (fs.existsSync(todopath)) {
        fs.readFile( todopath, (error,data) => {
            if(error) throw error
            let arr = data.toString().split("\n")
            let item = arr[ind-1]
            if (ind < arr.length){
                arr.splice(ind-1,1)
                fs.writeFile(todopath, arr.join("\n"),(err) => {
                    if(err) throw err
                })
                let date = new Date()
                date = date.toISOString().split('T')[0]
                newitem = `x ${date} ${item}`
                fs.appendFile(donepath,newitem+"\n",(err)=>{
                    console.log(`Marked todo #${ind} as done.`)
                })
            }
            else{
                console.log(`Error: todo #${ind} does not exist.`)
            }
        })
        
        }
    } catch(err) {
        console.error(err)
    }
}

function report(){
    let date = new Date()
    newdate=date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
    var pendingcg=0
    var donecg=0
    try {
        if (fs.existsSync(todopath)) {
        fs.readFile( todopath, (error, data) => {
            if(error) throw error
            var arr = data.toString().split("\n")
            arr.forEach((ele) => {
                if(ele){
                    pendingcg = pendingcg +1 
                }
            })
        })
        if (fs.existsSync(donepath)) {
            fs.readFile( donepath, (error, data) => {
                if(error) throw error
                var arr = data.toString().split("\n")
                arr.forEach((ele) => {
                    if(ele){
                        donecg ++
                    }
                })
            })
        }
        else{
            donecg=0
        }
        console.log(`${newdate} Pending:${pendingcg} Completed: ${donecg}`)
        }
        else{
            console.log("No pending tasks.")
        }
    } catch(err) {
        console.error(err)
    }
}


function helps(){
    let usage = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;
    

process.stdout.write(usage.toString())

}

module.exports = {
    add,
    ls,
    del,
    done,
    report,
    helps
}
