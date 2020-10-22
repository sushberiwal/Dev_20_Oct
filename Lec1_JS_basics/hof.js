// HOF function =>
// High Order Functions =>
// Functions which take function as an argument;


// Callback functions =>
// Function which are passed as a function in another functions;

function getFirstName(name){
    // return firstName;
    // "Steve Rogers"
    name = name.split(" ");
    // [ "Steve" , "rogers"];
    return name[0];

}

function getLastName(name){
    name = name.split(" ");
    return name[1];
}


function fun(  name , sayHi  ){
   let a =  sayHi(name);
   console.log(a + " says Hi");
}


fun("Steve Rogerrs" , getFirstName);
fun("Steve Rogerrs" , getLastName);

