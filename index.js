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
            arr = data.toString().split("\n")
            if (ind < arr.length){
                newarr = arr[ind-1].split(";")
                newarr[1]="done"
                newarr.join(";")
                arr.splice(ind-1,1,newarr)
                fs.writeFile(path, arr.join("\n"),(err) => {
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
    helps
}
