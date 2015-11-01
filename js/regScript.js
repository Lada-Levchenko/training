var nick = "";
var email = "";
var password1 = "";
var password2 = "";

var users = 0;
function user(){
    return{
        id:++users,
        nickname:nick,
        email:email,
        password:password1
    };
}


function CheckNick(tex){
    nick = String(tex);
    if(nick.length < 3){
        $("#InputNick").css("border", "2px solid #ff0000");
        alert("Nickname must consist of at least 3 symbols");
        return false;
    }
    else{
        $("#InputNick").css("border","2px solid #00ff00");
        return true;
    }
    
}

function CheckPassword1(pass){
    password1 = pass;
    if(password2 !== ""){
        CheckPassword2(password2);
    }
}

function CheckPassword2(pass){
    password2 = pass;
    if(password1 !== password2){
        $("#InputPassword").css("border", "2px solid #ff0000");
        $("#ConfirmPassword").css("border", "2px solid #ff0000");
        alert("Passwords don't match");
        return false;
    }
    else{
        $("#InputPassword").css("border", "2px solid #00ff00");
        $("#ConfirmPassword").css("border", "2px solid #00ff00");
        return true;
    }
}

function endRegistration(){
    if(CheckNick(nick) && CheckPassword2(password2)){
        email = $("#InputMail").val();
        var newUser = user();
        
        console.log(newUser);
        /*
        var encoded = JSON.stringify(newUser);
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://just-imagine.hol.es/projects/MindForce/reg.php',true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(encoded);
        */
        $.getJSON( "http://just-imagine.hol.es/projects/MindForce/data/userList.json", "", 
            function( users ) {
                newUser.id = users.length + 1;
                users.push(newUser);
                console.log(users);
                
                $.ajax({
                    type: "POST",
                    url: "http://just-imagine.hol.es/projects/MindForce/reg.php",
                    dataType: 'JSON',

                    data: JSON.stringify(users),

                    beforesend: console.log("sending"),

                    success: function(data, code){
                        if (code==200){
                          console.log(data); // запрос успешно прошел
                        }else{
                          console.log(code); // возникла ошибка, возвращаем код ошибки
                        }
                    },

                    error:  function(xhr, str, err){
                         console.log(str + " " + err);
                    },

                    complete:  function(){ //а тут ничего из предложенных параметров не берем :)
                        console.log("complete"); //например, спрятали какую-то кнопочку, которая вызывала запрос
                        window.setTimeout(function(){window.location.replace("http://just-imagine.hol.es/projects/MindForce/users.html");}, 2000);
                        
                    }
            
                });
                
                
            });
        
        
        
        /////////////////////////////
        
        /*newUser = $("#InputNick").serialize();
        console.log(newUser);
        $.ajax({
            type:'post',
            url:'http://192.168.100.43:8080/',
            data:newUser,
            success: function(data){alert(data);},
            error:function(){alert("error");},  
            dataType:"text"
        });
        */
    }
    
}
var list;
$(document).ready(
    function(){
        $("#MyButton").click(StartAnimation);
        $("#MyButton").dblclick(function(){
            $("#MyButton").stop();
        }
        );
        
        $.getJSON( "http://just-imagine.hol.es/projects/MindForce/data/userList.json", "", 
            function( data ) {
                list = data;
                console.log(list);
            });

        //
        //
//        $.getJSON("data/userList.json", function(list){
//            users = list.users;
//        });
//        window.console.log(users[0].id);
    }
);

function StartAnimation(){

    $(this).animate({
        width:"200px"}, 
    5000);
}