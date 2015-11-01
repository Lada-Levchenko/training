var MainLogo;
var MainContent;
var ChooseSubjectView;
var TempSubject;
var BattleField;
var BattleResultWindow;
var Opponent;
var Win;


Subjects = {
     Math: "Math",
     English: "English",
     Biology: "Biology"
};

function Skill(n, sub, imgRef, act, pow, t, desc){
    return {
        Name: n,
        Subject: sub,
        Image: imgRef,
        Action: act,
        Power: pow,
        Task: t,
        Description: desc
    };
}


function UseSkill(skill){
    if (isPlayerTurn) {
		var temp = skill.Task();
		console.log(temp);
        if(temp) {
            skill.Action(Player, Opponent);
        }
        else{
            MadeAction("Player tried to use skill " + skill.Name + " but failed.");
        }
    }
    else{
        alert("It's not your turn!");
    }
}

/**
 * @return {boolean}
 */
function CommonTask() {
    var x = Math.floor((Math.random() * 100) + 1);
    var y = Math.floor((Math.random() * (100 - x)) + 1);
    var rightAnswer = x + y;
    var plAnswer = prompt("Input the right answer: " + x + " + " + y + " = ?");

    return (plAnswer == rightAnswer);
}

/**
 * @return {boolean}
 */
function MathMultiply1Task(){
    var x = Math.floor((Math.random() * 10) + 1);
    var y = Math.floor((Math.random() * 10) + 1);
    var rightAnswer = x * y;
    var plAnswer = prompt("Input the right answer: " + x + " * " + y + " = ?");

    return (plAnswer == rightAnswer);
}

/**
 * @return {boolean}
 */
function MathRational1Task(){
    var x = ((Math.floor(Math.random() * 2) === 1)?(-1):(1)) * Math.floor((Math.random() * 100) + 1);
    var y = ((Math.floor(Math.random() * 2) === 1)?(-1):(1)) * Math.floor((Math.random() * (100 - (x > 0)?(x):(-x))) + 1);
    var rightAnswer = x + y;
    var plAnswer = prompt("Input the right answer: (" + x + ") + (" + y + ") = ?");

    return (plAnswer == rightAnswer);
}

function CommonTransition(user, target){
    target.CurrMindForce -= this.Power;
    user.CurrMindForce += this.Power;
    var result = UpdateMindForces();
    MadeAction("Player " + user.Name + " has used skill " + this.Name + " against " + target.Name
        + ". <br />It transitions " + this.Power + " points of MindForce from " + target.Name + " to " + user.Name + "."
        + result);
}

function CommonAttack(user, target) {
    target.CurrMindForce -= this.Power;
    var result = UpdateMindForces();
    MadeAction("Player " + user.Name + " has used skill " + this.Name + " against " + target.Name
        + "<br />" + target.Name + " looses " + this.Power + " points of MindForce."
        + result);
}

function UpdateMindForces(){
    var result;
    if(isPlayerTurn){
        if(Opponent.CurrMindForce <= 0){
            Opponent.CurrMindForce = 0;
            result = "<br />Opponent was defeated!";
            Win = true;
        }
        else if(Opponent.CurrMindForce > Opponent.MindForce){
            Opponent.CurrMindForce = Opponent.MindForce;
            result = "";
        }
        else{
            result = "<br />Opponent still stands.";
        }
        if(Player.CurrMindForce > Player.MindForce){
            Player.CurrMindForce = Player.MindForce;
            result = "";
        }
    }
    else{
        if(Player.CurrMindForce <= 0){
            Player.CurrMindForce = 0;
            result = "<br />You loose!";
            Win = false;
            alert("You lost all your MindForce! You can't continue!");
        }
        else if(Player.CurrMindForce > Player.MindForce){
            Player.CurrMindForce = Player.MindForce;
            result = "";
        }
        else{
            result = "";
        }
        if(Opponent.CurrMindForce > Opponent.MindForce){
            Opponent.CurrMindForce = Opponent.MindForce;
            result = "";
        }
    }

    var PlayerUI = document.getElementById("PlayerUI");
    var PlMindForce = PlayerUI.getElementsByClassName("CurrMindForce")[0];
    PlMindForce.style.transition = "width 0.3s ease-in-out";
    PlMindForce.style.width =  Math.floor(Player.CurrMindForce / Player.MindForce * 200) + "px";
    PlayerUI.getElementsByClassName("MindForceBar")[0].getElementsByTagName("p")[0].innerHTML = "MindForce: " + Player.CurrMindForce + " / " + Player.MindForce;

    var OpponentUI = document.getElementById("RobotUI");
    var OpMindForce = OpponentUI.getElementsByClassName("CurrMindForce")[0];
    OpponentUI.getElementsByClassName("MindForceBar")[0].getElementsByTagName("p")[0].innerHTML = "MindForce: " + Opponent.CurrMindForce + " / " + Opponent.MindForce;
    OpMindForce.style.transition = "width 0.3s ease-in-out";
    OpMindForce.style.width =  Math.floor(Opponent.CurrMindForce / Opponent.MindForce * 200) + "px";

    return result;
}

var SkillShot = Skill("Shot", Subjects.Math, "img/Skills/Math/2ndGrade/1_Shot.png", CommonAttack, 5, CommonTask, "This skill subtracts 5 points of opponent's MindForce.");
var SkillExplosion = Skill("Explosion", Subjects.Math, "img/Skills/Math/2ndGrade/2_Explosion.png", CommonAttack, 10, MathRational1Task, "This skill subtracts 10 points of opponent's MindForce.");
var SkillStorm = Skill("Storm", Subjects.Math, "img/Skills/Math/2ndGrade/3_Storm.png", CommonTransition, 5, MathMultiply1Task, "This skill transitions 5 points of opponent's MindForce to Player.");

var Player = {
    Name: "Player",
    MindForce: 50,
    CurrMindForce: 50,
    ActiveSkills: [SkillShot, SkillExplosion, SkillStorm]
};

function Robot (n, mf, pow){
    return {
        Name: n,
        MindForce: mf,
        CurrMindForce: mf,
        Power: pow
    };
}

window.onload = function(){
    MainLogo = document.getElementById("MainLogo");

    MainContent = document.getElementById("MainContent");

    ChooseSubjectView = document.getElementById("ChooseSubject");
    ChooseSubjectView.parentNode.removeChild(ChooseSubjectView);

    BattleResultWindow = document.getElementById("BattleResultWindow");
    BattleResultWindow.parentNode.removeChild(BattleResultWindow);

    BattleField = document.getElementById("BattleField");
    BattleField.parentNode.removeChild(BattleField);

};

var StartGame = function(){
    var NickName = prompt("Enter your nickname:");
    Player.Name = (NickName !== "")?(NickName):("Anonymous");
    MainLogo.parentNode.removeChild(MainLogo);
    ChooseSubjectMode();
};

function ChooseSubjectMode(){
    MainContent.appendChild(ChooseSubjectView);
}

var ChooseSubject = function(subj){
    ChooseSubjectView.parentNode.removeChild(ChooseSubjectView);
    TempSubject = subj;
    console.log(TempSubject);
    BattleFieldMode();
};



////////////////////////////////////////////////////////////////
////////////// BATTLE //////////////////////////////////////////
////////////////////////////////////////////////////////////////



var isPlayerTurn = false;
var BattleLog;
var Timer;
var TurnDuration = 20;
var timeoutID;


function BattleFieldMode(){
    MainContent.appendChild(BattleField);
    InstantiatePlayer();
    InstantiateRobot();
    UpdateMindForces();
    BattleLog = document.getElementById("BattleLog");
    Timer = BattleField.getElementsByClassName("Timer")[0];
    PlayerTurn();
}

function InstantiatePlayer(){
    var PlayerUI = document.getElementById("PlayerUI");
    (PlayerUI.getElementsByClassName("NickName"))[0].innerHTML = Player.Name;
    
    var skillElements = PlayerUI.getElementsByClassName("Skill");
    for(var i = 0; i < Player.ActiveSkills.length; i++){
        skillElements[i].title = "Name: " + Player.ActiveSkills[i].Name + " | Subject: " + Player.ActiveSkills[i].Subject
                                    + " | " + Player.ActiveSkills[i].Description;
        skillElements[i].src = Player.ActiveSkills[i].Image;

    }
}

function InstantiateRobot(){
    Opponent = RandomRobot();
    var RobotUI = document.getElementById("RobotUI");
    RobotUI.getElementsByClassName("Avatar")[0].src = "img/Robots/" + Opponent.Name + ".png";

    (RobotUI.getElementsByClassName("NickName"))[0].innerHTML = Opponent.Name;
    
}

function RandomRobot(){
    var numberOfRobot = Math.floor((Math.random() * 3) + 1);
    switch (numberOfRobot){
        case 1:
            return Robot("Creepy", 30, 10);
        case 2:
            return Robot("Clockie", 50, 5);
        case 3:
            return Robot("Seeker", 40, 7);
    }
}

function PlayerTurn(){
    window.clearTimeout(timeoutID);
    $(Timer).stop(true, true);
    $(Timer).css({"width":"150px"});
    isPlayerTurn = true;
    document.getElementById("pTurn").innerHTML = Player.Name + "'s turn";
    timeoutID = window.setTimeout(OpponentTurn, TurnDuration * 1000);
    timeouts++;
    $(Timer).animate({"width":"0px"},TurnDuration * 1000);
}


function MadeAction(actMessage){
    var tempLog = BattleLog.innerHTML;
    BattleLog.innerHTML = "<p>" + actMessage + "</p>" + tempLog;

    if(isPlayerTurn && Opponent.CurrMindForce > 0) {
        OpponentTurn();
    }
    else if(Player.CurrMindForce > 0 && Opponent.CurrMindForce > 0){
        PlayerTurn();
    }
    else{
        alert("End of the Battle!");
        isPlayerTurn = false;
        BattleResultMode();
    }
}

function OpponentTurn(){
    window.clearTimeout(timeoutID);
    $(Timer).stop(true, true);
    $(Timer).css({"width":"150px"});
    isPlayerTurn = false;
    document.getElementById("pTurn").innerHTML = "<span style='color:#ff0000'>" + Opponent.Name + "</span>" + "'s turn";
    timeoutID = window.setTimeout(CommonRobotAction, 2 * 1000);
    timeouts++;
    $(Timer).animate({"width":"0px"}, TurnDuration * 1000);
}

function CommonRobotAction(){
    Player.CurrMindForce -= Opponent.Power;
    var result = UpdateMindForces();
    MadeAction(Opponent.Name + " steals " + Opponent.Power + " points of " + Player.Name + "'s MindForce." + result);
}

function ExpressWin(){
    Opponent.CurrMindForce = 0;
    var result = UpdateMindForces();
    MadeAction(result);
}

var timeouts = 0;
function BattleResultMode(){
    BattleField.appendChild(BattleResultWindow);
	var tempResult;
    if(Win){
        tempResult = "<span style='color:#00ff00'> Congratulations! You won! Here's your cookie.</span>";

    }
    else{
        tempResult = "<span style='color:#ff0000'> You lost all your MindForce. You can't continue.</span>";

    }
    BattleResultWindow.getElementsByTagName("p")[0].innerHTML = tempResult;
}
function ExitBattle(){
    window.clearTimeout(timeoutID);
    BattleLog.innerHTML = "<p id='startOfHistory'>Start!</p>";
    BattleResultWindow.getElementsByTagName("p")[0].innerHTML = "";
    BattleResultWindow.parentNode.removeChild(BattleResultWindow);
    BattleField.parentNode.removeChild(BattleField);
    ChooseSubjectMode();
}


