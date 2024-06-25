let options=["bat","ball","stump"];
document.getElementById("reset").addEventListener("click",()=>{
    userScore.win=0;
    userScore.lost=0;
    userScore.tie=0;
    compScore.win=0;
    compScore.lost=0;
    compScore.tie=0;
    check("","");
    updateStorege();
    scoreChange();
})
let getUser=JSON.parse(localStorage.getItem("user-score")) || {win:0,lost:0,tie:0}
let getComp=JSON.parse(localStorage.getItem("comp-score")) || {win:0,lost:0,tie:0}
let userScore={
    win:getUser.win || 0,
    lost:getUser.lost || 0,
    tie:getUser.tie || 0,
}
let compScore={
    win:getComp.win || 0,
    lost:getComp.lost || 0,
    tie:getComp.tie || 0,
}
document.getElementById("update").addEventListener("click",()=>{
    check("","");
})
const updateStorege=()=>{
    localStorage.setItem(
        "user-score",JSON.stringify(userScore));
    localStorage.setItem("comp-score",JSON.stringify(compScore));
}
const generateChoice=(getChoice)=>{
   let computerChoice=options[Math.round(Math.random()*2)];
    check(getChoice.target.id,computerChoice);
}
let el=document.getElementsByClassName("opts");
for(let ele=0;ele<el.length;ele++){
    el[ele].addEventListener("click",()=>{generateChoice(event)})
}
const scoreChange=()=>{
    document.getElementById("user-score").innerText=`your score:${userScore.win}`;
    document.getElementById("comp-score").innerText=`computer score:${compScore.win}`;
    document.getElementById("tie").innerText=`ties:${compScore.tie}`;
    updateStorege()
}
const check=(user,comp)=>{
    let result=document.getElementById("result");
    let dec=document.getElementById("dec")
    if(user=="" && comp==""){
        dec.innerText="";
        result.innerText="";
        scoreChange();
        return;
    }
     dec.innerText=`your choice is ${user} computer choice is ${comp}`
    if(user==comp){
       result.innerText="it's draw";
       userScore.tie++;
       compScore.tie++;
    }else if(user=="bat"){
        if(comp=="ball"){ result.innerText="you won";
            userScore.win++;
            compScore.lost++;
        }
        else{ result.innerText="you lost";
            compScore.win++;
            userScore.lost++;
        }
    }else if(user=="ball"){
        if(comp=="bat"){ result.innerText="you lost";
            compScore.win++;
            userScore.lost++;
        }
        else{ result.innerText="you won";
            userScore.win++;
            compScore.lost++;
        }
    }else{
        if(comp=="ball"){ result.innerText="you lost";
            compScore.win++;
            userScore.lost++;
        }
        else if(comp=="bat"){ result.innerText="you won";
            userScore.win++;
            compScore.lost++;
        }
    }
    scoreChange();
}