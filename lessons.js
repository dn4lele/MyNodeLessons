///lesson1
let workers=[
    {
        name:"Daniel",
        id:321213231,
        say:"hello"
    }
    ,
    {
        name:"sahar",
        id:321245213,
        say:"nice"
    }
    ,
    {
        name:"rany",
        id:12344144,
        say:"hello"
    }
]
//return array
const find1 =workers.filter(x=>x.say == "hello");
//return the first obj
const find2 =workers.find(x=>x.say == "hello");

console.log(find1);
console.log(find2);





///lesson 2
//function syntax 
const sayhello  =  ()=>{
    console.log("hello from node.js");
}   


//function syntax with parameter
const addnumber  =  (numa,numb)=>{
    console.log(numa+numb);
}   

//function syntax with parameter and returns
const saymyname  =  (name,age)=>{
    return `my name is ${name} and my age is ${age}`;
}   



sayhello();
addnumber(10,30);
const result = saymyname("daniel",18);
console.log(result);