var fs = require("fs")

const path = './todo.txt'

function add(item){
    try {
        if (fs.existsSync(path)) {
        fs.appendFile( path, item+";pending"+"\n", (error) => {
            if(error) throw error
            console.log(`Added todo: \"${item}\"`)
        })
        }
        else{
            fs.writeFile(path,"",(err)=>{
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
        if (fs.existsSync(path)) {
        fs.readFile( path, (error, data) => {
            if(error) throw error
            newarr=[]
            var arr = data.toString().split("\n")
            arr.forEach((ele,index) => {
                if(ele){
                    if(ele.split(";")[1]==="pending"){
                        newarr.push(ele)
                    }
                    
                }
            });
            newarr.slice().reverse().forEach((ele,index) =>{
                if(ele){
                    console.log(`[${newarr.length - index}] ${ele.split(";")[0]}`)
                }
            })
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
        if (fs.existsSync(path)) {
        fs.readFile( path, (error,data) => {
            if(error) throw error
            arr = data.toString().split("\n")
            if (ind < arr.length){
                arr.splice(ind-1, 1)
                fs.writeFile(path, arr.join("\n"),(err) => {
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
        if (fs.existsSync(path)) {
        fs.readFile( path, (error,data) => {
            if(error) throw error
            newarr=[]
            var arr = data.toString().split("\n")
            arr.forEach((ele,index) => {
                if(ele){
                    if(ele.split(";")[1]==="pending"){
                        newarr.push(ele)
                    }
                    
                }
            });
            if (ind < newarr.length){
                newarrr = newarr[ind-1].split(";")
                newarrr[1]="done"
                newarrr.join(";")
                newarr.splice(ind-1,1,newarrr)
                fs.writeFile(path, newarr.join("\n"),(err) => {
                    if(err) throw err
                    console.log(`Marked todo #${ind} as done.`)
                } )
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
    try {
        if (fs.existsSync(path)) {
        fs.readFile( path, (error, data) => {
            if(error) throw error
            var arr = data.toString().split("\n")
            let pendingc=0
            let donec=0
            arr.forEach((ele) => {
                if(ele){
                    if(ele.split(";")[1]==="pending"){
                        pendingc++
                    }
                    else{
                        donec++
                    }
                    
                }
            })
            console.log(`${newdate} Pending:${pendingc} Completed: ${donec}`)

        })
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
