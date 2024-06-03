//accessing element...using queryselector
//whoes turn ...X or O...hence using variable turnx
//storing winning patterens

//On clicking button(boxes) some action must be performed..Therefore adding event listener to buttons..using .for each loop..
//Now after clicking what action is to be performed(here we want to print/diaplay x or o inside the bos text) that we are doing  using inner text property and which depends upon the variable value(turnx) like whose turn is it   ...therefore box.innerText="X" or"O"...but
//Problem with only writing that box.innerText="X" or"O". is that if we click that same box again it will turn to opposite value that is if x then o and vice-versa...so to overcome it we will have to diable that button hence using box.disabled="true";

//Now after that... that is after every click we have to check that if we have got the winner or not...hence Have created separate function to cheque that if he had got the winner or not   let iswinner=checkwinner();
// Also based upon that checkwinner value we will have to cheque that if it is draw condition or not(We get draw condition when we get no winner even after playing all nine turns....hence the count variable keeps track of no of buttons that are already utilizes in playing game ...Also is winner tells whether we got winner till date or not) hence we are storing that value which is written by check winner

//Now to check winner... we have to check each winning pattern..Now in each winning pattern we have to check for three buttons that is which forms the pattern hence assessing each index(individual button) from each pattern(1D array) ...Therefore get each pattern we are iteration on 2D winningpatter

//now after getting winner We have to display it hence that position value to show winner ...It will display the congratulations message along with the winner name...Also after the winner is getting displayed the further game must not be continued that is all other buttons must be disabled hence adding the disabled option in showWinner function itself

//Now after the new game/reset game... we have to enable all the buttons again so that they could work as before that is clickable so created the function enableboxes

//Now we want to set features of reset and new button

let boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector("#reset-btn");
let newgamebutton=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnx=true;
let count=0;//To keep track of draw happens in match or not

const winningpatter=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetgame=()=>{
    turnx=true;//Setting the initial value of Turnx variable
    count=0;
    enableboxes();//Show the disabled properties set will be removed
    msgContainer.classList.add("hide");//Also if the game is reset no winner is there so resetting the winner message to be hidden
}

//box is individual button and then adding eventlistener to each button when click
//Either we click Reset button or new button the game is to be reset hence no need of specifically again writing the function for new game when clicked newgame button...Added eventlistener to new game button and reset button

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnx){
            box.innerText="X";
            turnx=false;//next turn
        }
        else{
            box.innerText="O";
            turnx=true;//next turn
        }
        box.disabled="true";//So that if again the box is clicked it's value don't get change
        count++;

        let iswinner=checkwinner();

        if(count===9 && !iswinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a draw`;
    msgContainer.classList.remove("hide");
    disableboxes();
}

//disable button after winner is declared so as to not get the changing winner
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";//The value which was stored in previous came get removed when the game is reset hence setting inner text value for empty
    }
};

//At starting we don't have any winner so no need to display that winner message... henceforth had used another class name that is hide in html
const showWinner=(winner)=>{
    //msg is paragraph...Hence adding inner text to that paragraph
    msg.innerText=`Congratulation, Winner is ${winner}`;
    //And now to display that message we would remove the class hide from message container class
    msgContainer.classList.remove("hide");
    disableboxes();//Disable all buttons after getting winner so that the father game has not been continued
};

const checkwinner=()=>{
    for(let pattern of winningpatter){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        //patter is array ...and to get each button from pattern using pattern index

        let position1val=boxes[pattern[0]].innerText;
        let position1val2=boxes[pattern[1]].innerText;
        let position1val3=boxes[pattern[2]].innerText;
        
        if(position1val !="" && position1val2 != "" && position1val3 !=""){
            if(position1val==position1val2 && position1val==position1val3){
                // console.log("winner");
                showWinner(position1val);
                return true;
            }
        }
    }
};

newgamebutton.addEventListener("click",resetgame);
resetbutton.addEventListener("click",resetgame);


