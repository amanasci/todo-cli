var fs = require("fs");

const todopath = `${__dirname}/todo.txt`;
const donepath = `${__dirname}/done.txt`;

function add(item) {
  try {
    if (fs.existsSync(todopath)) {
      fs.appendFile(todopath, item + "\n", (error) => {
        if (error) throw error;
        console.log(`Added todo: \"${item}\"`);
      });
    } else {
      fs.writeFile(todopath, "", (err) => {
        if (err) throw err;
        add(item);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function ls() {
  try {
    if (fs.existsSync(todopath)) {
      fs.readFile(todopath, (error, data) => {
        if (error) throw error;
        var arr = data.toString().split("\n");
        if (arr.length === 1) {
          console.log("There are no pending todos!");
        }
        arr
          .slice()
          .reverse()
          .forEach((ele, index) => {
            if (ele) {
              console.log(`[${arr.length - index}] ${ele}`);
            }
          });
      });
    } else {
      console.log("There are no pending todos!");
    }
  } catch (err) {
    console.error(err);
  }
}

function del(ind) {
  try {
    if (fs.existsSync(todopath)) {
      fs.readFile(todopath, (error, data) => {
        if (error) throw error;
        arr = data.toString().split("\n");
        if (ind < arr.length && ind > 0) {
          arr.splice(ind - 1, 1);
          fs.writeFile(todopath, arr.join("\n"), (err) => {
            if (err) throw err;
            console.log(`Deleted todo #${ind}`);
          });
        } else {
          console.log(`Error: todo #${ind} does not exist. Nothing deleted.`);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function done(ind) {
  try {
    if (fs.existsSync(todopath)) {
      fs.readFile(todopath, (error, data) => {
        if (error) throw error;
        let arr = data.toString().split("\n");
        let item = arr[ind - 1];
        if (ind < arr.length && ind > 0) {
          arr.splice(ind - 1, 1);
          fs.writeFile(todopath, arr.join("\n"), (err) => {
            if (err) throw err;
          });
          let date = new Date();
          date = date.toISOString().split("T")[0];
          newitem = `x ${date} ${item}`;
          fs.appendFile(donepath, newitem + "\n", (err) => {
            console.log(`Marked todo #${ind} as done.`);
          });
        } else {
          console.log(`Error: todo #${ind} does not exist.`);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function readtodo() {
  let data = fs.readFileSync(todopath);
  let pendingcg = 0;
  var arr = data.toString().split("\n");
  arr.forEach((ele) => {
    if (ele) {
      pendingcg = pendingcg + 1;
    }
  });
  return pendingcg;
}

function readdone() {
  let donecg = 0;
  let data = fs.readFileSync(donepath);
  var arr = data.toString().split("\n");
  arr.forEach((ele) => {
    if (ele) {
      donecg++;
    }
  });
  return donecg;
}

function report() {
  let date = new Date();
  let month = date.getMonth() + 1;
  newdate = date.getFullYear() + "-" + month + "-" + date.getDate();
  let pendingcg = 0;
  let donecg = 0;

  try {
    if (fs.existsSync(todopath)) {
      pendingcg = readtodo();
    } else {
      pendingcg = 0;
    }
    if (fs.existsSync(donepath)) {
      donecg = readdone();
    } else {
      donecg = 0;
    }
    console.log(`${newdate} Pending : ${pendingcg} Completed : ${donecg}`);
  } catch (err) {
    console.error(err);
  }
}

function helps() {
  let usage = `Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics`;

  console.log(usage);
}

module.exports = {
  add,
  ls,
  del,
  done,
  report,
  helps,
};
