
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n'|| text === 'exit\n'){
    quit();
  }
  else if (text.startsWith("hello")) {
    hello(text.trim()) ;
  }
 
  else if(text==='help\n'){
    help();
  }
  else if (text === "list\n") {
    list();
}
else if (text.trim().split(" ")[0] === "add") {
  add(text);
} else if (text.trim().split(" ")[0] === "remove") {
  remove(text);
}
else if (text.trim().split(" ")[0] === "edit") {
  edit(text);
}
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
 function hello(N) {
  N = N.replace("hello", "");
  console.log("hello" + N + "!");
}



//help function give us more information about what and how other functions work! 
function help(){
  console.log('help : ----hello => print hello! \n  ----quit => Quitting now, goodbye! \n  ----update the text hello function \n  ----add list list all tasks \n  ---- add a task. Store the task in a list (array) \n  ----"remove" command that allows to remove' );
}


// FUNCTION list it lists all the tasks 

function list() {
  tasks.map((g, index) => {
      if (g.status) {
          console.log(`${index + 1}`);
      } else {
          console.log(`${index + 1} `);
      }
  });
}




function add(text) {
  var task = text.trim().split(" ");
  task.shift();
  task = task.join(" ");
  if (task.trim()) {
      let g = {
          task: task.trim(),
          status: false,
      };
      tasks.push(g);
      console.log(`${task} task added`);
  } else {
      console.log("Please add a task");
  }
}

function remove(text) {
  if (text.trim().split(" ")[1]) {
      var n = text.trim().split(" ")[1];
      var b = tasks.length;
      for (let i = 0; i < tasks.length; i++) {
          if (i == n - 1) {
              tasks.splice(i, 1);
              console.log(`task ${n} removed`);
          }
      }
      if (b === tasks.length) {
          console.log(`task ${n} does not exist`) ;
      }
  } else {
      tasks.pop();
      console.log("last task removed") ;
  }
}




function edit(text) {
  var task = text.trim().split(" ");
  task.shift();
  if (isNaN(Number(task[0]))) {
      task = task.join(" ");
      if (task.trim()) {
          tasks[tasks.length - 1].task = task;
          console.log(`task edited to ${task}`);
          list();
      } else {
          console.log("Please edit an existing task");
      }
  } else {
      let n = Number(task[0]);
      task.shift();
      task = task.join(" ");
      if (task.trim()) {
          if (n <= tasks.length) {
              tasks[n - 1].task = task;
              console.log(`task ${n} is edited to ${task}`);
              list();
          } else {
              console.log("number of task does not exist");
          }
      } else {
          console.log("Please edit an existing task");
      }
  }
}

/**
 * Exits the application
 * @returns {void}
 * 
 */



function quit(){
 console.log('Quitting now, goodbye!')
 process.exit();
}

function check(text) {
  var task = text.trim().split(" ");
  task.shift();
  if (isNaN(Number(task[0]))) {
      console.log("Please enter the number of the task you'd loke to check");
  } else {
      let n = Number(task[0]);
      tasks[n - 1].status = true;
      console.log(`Checked task ${n}`);
      list();
  }
}

function uncheck(text) {
  var task = text.trim().split(" ");
  task.shift();
  if (isNaN(Number(task[0]))) {
      console.log(
          "Please enter the number of the task you'd like to uncheck"
      );
  } else {
      let n = Number(task[0]);
      tasks[n - 1].status = false;
      console.log(`Task ${n} unchecked`);
      list();
  }
}

// The following line starts the application
startApp("Hisham El Ahdab")
