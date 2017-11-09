var socket = io("http://localhost:3000");

//server>client
socket.on("server-send-dki-thatbai",function(){
	alert("Duplicate username")
});

//send ds user
socket.on("server-send-ds-user",function(data){
	$("#boxContent").html("");	
	data.forEach(function(i){
		$("#boxContent").append("<div class='useronline'>" + i+ "</div>");	
	});
});

//tbao dki thanh cong, hide loginform
socket.on("server-send-dki-thanhcong",function(data){
	alert("Registration successful");
	$("#registerForm").hide();
	// $("#currentUser").html(data);
	$("#loginForm").show();
	// $("#chatForm").show(1000);
	// $("#listMessagesRoom").hide();
	// $("#thongbaoRoom").hide();
	// $("#messagesRoom").hide();
	// $("#sayHiRoom").hide();
});

socket.on("log-room",function(){
	alert("Bạn đã ở trong room này rồi")
});

socket.on("server-send-login",function(data){
	if((data.result)>0)
	{
		alert(data.alert);
		$(".alert-login").html("");
		// $("#registerForm").hide();
		$("#currentUser").html(data.nameuser);
		$('#iduser').val(data.iduser);
        $('#nameuser').val(data.username);
		$("#loginForm").hide(500);
		$("#chatForm").show(1000);
		$("#listMessagesRoom").hide();
		$("#thongbaoRoom").hide();
		$("#messagesRoom").hide();
		$("#sayHiRoom").hide();

	} else
		{
			$(".alert-login").html(data.reason);
		}
});

socket.on('all-recived', function(msg) {
	var iduser = $("#iduser").attr('value');
    //console.log(msg.datahtml);
    var listuser = '<li class="listuser fixuser well well-sm" idobj="090" style=" margin-bottom:0; font-weight: bold;background-color:skyblue;cursor: pointer;list-style-type: none;">Sửa thông tin user</li>';
    for (i = 0; i < msg.datahtml.length; i++) {
        if (iduser == msg.datahtml[i].idObj) {
            listuser += '<li class="listuser activeuser well well-sm" style="border:none;margin-bottom:0;list-style-type: none;background-color:ivory;" idobj="' + msg.datahtml[i].idObj + '"     nameobj="'+msg.datahtml[i].nameObj+'" nameuserobj="'+msg.datahtml[i].nameuserobj+'">' + msg.datahtml[i].nameuserobj + '</li>';
        } else {
            listuser += '<li class="listuser well well-sm" style="border:none;margin-bottom:0;list-style-type: none;background-color:ivory;" idobj="' + msg.datahtml[i].idObj + '" nameobj="'+msg.datahtml[i].nameObj+'" nameuserobj="'+msg.datahtml[i].nameuserobj+'">' + msg.datahtml[i].nameuserobj + '</li>';
        }
    }
    listuser += "<p class='tbao'>" + msg.reason + "</p>";
    $('#boxContent').html(listuser);
    $('.tbao').fadeOut(6000);
});


$(document).on('click', '.off-chat-private', function(e) {
    $(this).parent().parent().hide();
});

$(document).on('click', '.listuser', function(e) {
    var iduser = $(this).attr("idobj");
    if(iduser == "090") return;
    var nameuser = $(this).attr("nameobj");
    var nameuserobj = $(this).attr("nameuserobj");
    var iduser_tmp = $('#iduser').val();
    if (iduser == iduser_tmp) return;
    var html_chatprivate = '<div id="' + nameuser + '"style="max-width:250px;width: 30%;position: fixed;bottom: 0;left: 10px;height: 300px;z-index: 999;background-color: #eee;/* opacity: 0.4; */border: 1px solid rgba(0,0,0,.1);box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);"><div style="   min-height: 35px;   background: lightseagreen !important;line-height: 35px;padding-left: 10px;"><span style="color:white" class="nameuser">'+nameuserobj+'</span><input type="button" class="off-chat-private" value="  X " style="float: right;border: none;background-color: transparent; color: white; padding-top: 10px; "></div><div class="kq-tinnhan-gui" style="border: 3px solid white;padding: 10px;height: 190px;overflow-y: scroll;"></div><div class="mespri">            <input type="text" class="mess-tinnhan-gui form-control" placeholder="Type a message" value="">            <input type="button" class="send-tinnhan-gui btn btn-success" idusernhan="'+iduser+'" value="Send">        </div>    </div>';
    if ($("#" + nameuser).length == 0) {
        //it doesn't exist
        $('body').append(html_chatprivate);
    } else {
        $("#" + nameuser).show();
    }

});
$(document).on('click', '.send-tinnhan-gui', function(e) {
    var mess = $(this).siblings('.mess-tinnhan-gui').val();
    var iduser = $(this).attr('idusernhan');
    var iduser_gui = $('#nameuser').val();
    $(this).parent().parent().children('.kq-tinnhan-gui').append('<p><b>'+iduser_gui+':</b>'+mess+'</p>')
    //$("#" +  msg.nameuser + " > .kq-tinnhan-gui ").append('<p>'+msg.noidung+'</p>');
    var tmp = {};
    tmp.guiden = iduser;
    tmp.noidung = mess;
    socket.emit('sender-send-private', tmp);
});

$(document).on('click', '.room',function(){
	var roomID = $(this).attr('roomID');
	// alert(roomID);
	socket.emit("join-room",roomID);
});

$(document).on('click','.fixuser',function(e){
    $('#fix-register-card').show();
    socket.emit("request-info",$("#nameuser").val());
});

socket.on("send-info",function(info){
	$("#first-name-fix").val(info.firstname);
	$("#last-name-fix").val(info.lastname);
	$('#email-fix').val(info.email);
});

socket.on("server-res-fix",function(res){
	$('.log-fix-card').html(res.reason);
});

socket.on('server-send-oneclient', function(msg) {
                //$('#tinnhan-nhan').show();
                //$('#tinnhan-nhan > .user-tinnhan-nhan ').html(msg.username);
                //$('#tinnhan-nhan > #kq-tinnhan-gui ').append(msg.noidung);
                var html_chatprivate = '<div id="' + msg.nameuser + '"style="max-width:250px;width: 30%;position: fixed;bottom: 0;left: 10px;height: 300px;z-index: 999;background-color: #eee;/* opacity: 0.4; */border: 1px solid rgba(0,0,0,.1);box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);"><div style="   min-height: 35px;   background: lightseagreen !important;line-height: 35px;padding-left: 10px;"><span style="color:white" class="nameuser">'+msg.nameuserobj+'</span><input type="button" class="off-chat-private" value="  X " style="float: right;border: none;background-color: transparent; color: white; padding-top: 10px; "></div><div class="kq-tinnhan-gui" style="border: 3px solid white;padding: 10px;height: 190px;overflow-y: scroll;"><p><b>'+msg.nameuser+':</b>'+msg.noidung+'</p></div><div class="mespri">            <input type="text" class="mess-tinnhan-gui form-control" placeholder="Type a message" value="">            <input type="button" class="send-tinnhan-gui btn btn-success" idusernhan="'+msg.iduser+'" value="Send">        </div>    </div>';
                if ($("#" +  msg.nameuser).length == 0) {
                    //it doesn't exist
                    $('body').append(html_chatprivate);
                } else {
                    $("#" +  msg.nameuser).show();
                    $("#" +  msg.nameuser + " > .kq-tinnhan-gui ").append('<p><b>'+msg.nameuser+':</b>'+msg.noidung+'</p>'); 
                }
            });

socket.on("server-send-room",function(data){
	$("#currentRoom").html(data);
	$("#listMessagesRoom").show(1500);
	$("#thongbaoRoom").show(1500);
	$("#messagesRoom").show(1500);
	$("#listMessages").hide(1000);
	$("#sayHiRoom").show(1500);		
	$("#thongbao").hide(1000);
	$("#messages").hide(1000);
});

socket.on("server-send-ds-room",function(data){
	$("#dsRoom").html("");
	data.map(function(r){
	var s ="<div class='room' roomID='" + r + "'> <input type='button' class='btn btn-info' value=" + r + "> </div>";
		$("#dsRoom").append(s);
	});
});

socket.on("server-send-messages",function(data){
	var time = new Date().toLocaleString();
	$("#listMessages").prepend("<p class='time'>" + time +"</p><div class='ms'>" + data.un + ":" + data.nd +"</div>");	
});

// socket.on("dang-nhap",function(data){
// 	$("#thongbao").html(data);
// });

// socket.on("stop-chat",function(){
// 	$("#thongbao").html("");
// });

// socket.on("room-dang-nhap",function(data){
// 	$("#thongbaoRoom").html(data);
// });

// socket.on("room-stop-chat",function(){
// 	$("#thongbaoRoom").html("");
// });


socket.on("server-chat-room",function(data){
	var time = new Date().toLocaleString();
	$("#listMessagesRoom").prepend("<div class='msRoom'>" + data.un + ":" + data.nd +"</div><p class='time'>" + time +"</p>");	
});

socket.on('kick',function(){
	$("#btnLogout").click();
	$("#fix-register-card").hide();
});

socket.on('receivePhoto', function(data){
		console.log(data);
	// 	document.getElementById("showPhoto").src = data.path;
	$("#listMessages").prepend("<div class='ms'>" + data.un +': ' + "<img id='theImg' src="+ data.path + " /></div>");
	// $('#listMessages').prepend("<img id='theImg' src="+ data.path + " />'");	
});

function submitImg(){
	var selector 	= document.getElementById("fileSelector");
	// var img 			= document.getElementById("review");

	var reader = new FileReader();
  reader.onload = function (e) {
    // img.src = e.target.result;
		socket.emit("sendPhoto", {base64:e.target.result});
  }
 	reader.readAsDataURL(selector.files[0]);
}
$(document).ready(function(){
	$("#loginForm").show();
	$("#registerForm").hide();
	$("#chatForm").hide();
	$('#fix-register-card').hide();

	$('#fileSelector').on('change',function(){
		submitImg();
	});
	//emit username>server
	$("#btnRegister").click(function(){
		// socket.emit("Client-send-username", $("#txtUserName").val());
		$("#loginForm").hide();
		$("#registerForm").show();
	});

	$("#btnBack").click(function(){
		$("#loginForm").show();
		$("#registerForm").hide();
	});

	$("#btnDone-fix").click(function(){
		var nameuser = $("#nameuser").val();
		var oldpass = $('#old-password-fix').val();
		var newpass = $('#new-password-fix').val();
		var firstname = $('#first-name-fix').val();
		var lastname = $('#last-name-fix').val();
		var email = $('#email-fix').val();
		if (oldpass.trim()==0){
			$('#old-password-fix').focus;
			$(".log-fix-card").html("Bạn chưa nhập mật khẩu cũ");
			return false;
		}else if (newpass.trim()==0){
			$('#new-password-fix').focus;
			$(".log-fix-card").html("Bạn chưa nhập mật khẩu mới");
			return false;
		}else if (email.trim()==0){
			$('#email-fix').focus;
			$(".log-fix-card").html("Email không được để trống");
			return false;
		}else if (firstname.trim()==0){
			$('#first-name-fix').focus;
			$(".log-fix-card").html("Bạn chưa nhập đầy đủ tên");
			return false;
		}else if (lastname.trim()==0){
			$('#last-name-fix').focus;
			$(".log-fix-card").html("Bạn chưa nhập đầy đủ tên");
			return false;
		}
		socket.emit('send-fix-info',{nameuser:nameuser, oldpass:oldpass, newpass:newpass,email:email, firstname:firstname, lastname:lastname});
	});

	$('#btnCancel').click(function(e){
        $('#fix-register-card').hide();
    });

	$("#btnRegisterUser").click(function(e){
	   	var u = $('#txtUserName-register').val();
        var p = $('#txtPassword-register').val();
        var e = $('#txtEmail-register').val();
        var f = $('#txtFisrtName-register').val();
        var l = $('#txtLastName-register').val();
        if(!u||u.length === 0)
        {
        	$('#txtUserName-register').focus();
        	$(".alert-register").html("Username is empty!");
        	return false;
        } else if(!p||p.length ===0)
    		{
    			$('#txtPassword-register').focus();
	        	$(".alert-register").html("Password is empty!");
	        	return false;
    		} else if(!e||e.length ===0)
        		{
        			$('#txtEmail-register').focus();
		        	$(".alert-register").html("Email is empty!");
		        	return false;
        		}else if(!f||f.length ===0)
        		{
        			$('#txtFisrtName-register').focus();
		        	$(".alert-register").html("FisrtName is empty!");
		        	return false;
        		}else if(!l||l.length ===0)
        		{
        			$('#txtLastName-register').focus();
		        	$(".alert-register").html("LastName is empty!");
		        	return false;
        		}
     	socket.emit("Client-send-user-info",{
     		username: u,
     		password: p,
     		email: e,
     		fisrtname: f,
     		lastname: l
     	});
	});

	$("#btnLogin").click(function(){
	    var tmp = {};

        tmp.username = $('#txtUserName').val();
        tmp.password = $('#txtPassword').val();
        if (!tmp.username || tmp.username.length === 0) {
            $('#txtUserName').focus();
            $('.alert-login').html('Bạn chưa nhập user!');
            return false;
        } else if (!tmp.password || tmp.password.length === 0) {
            $('#txtPassword').focus();
            $('.alert-login').html('Bạn chưa nhập password!');
            return false;
        }
        socket.emit('login', tmp);
	});

	$("#btnLogout").click(function(){
		socket.emit("logout");
		$("#loginForm").show(1500);
		$("#chatForm").hide(700);
	});

	$("#btnSendMessages").click(function(){
		 var mess = $('#txtMessages').val();
                if(mess.trim().length<=0){
                    $('#txtMessages').focus();
                    return false;
                } 
             	socket.emit("user-send-messages", $("#txtMessages").val());
				$('#txtMessages').val('');
                $('#txtMessages').focus();
	});

	$("#txtMessages").focusin(function(){
		socket.emit("chatting");
	}); 

	$("#txtMessages").focusout(function(){
		socket.emit("offchat");
	}); 

	// $("#txtMessagesRoom").focusin(function(){
	// 	socket.emit("room-chatting");
	// }); 

	// $("#txtMessagesRoom").focusout(function(){
	// 	socket.emit("room-offchat");
	// }); 


	$("#btnRoom1").click(function(){
		socket.emit("join-room1");
	});

	$("#btnLeaveRoom").click(function(){
		socket.emit("leave-room",$("#currentRoom").val());
		$("#listMessagesRoom").hide(1000);
		$("#thongbaoRoom").hide(1000);
		$("#messagesRoom").hide(1000);
		$("#sayHiRoom").hide(1000);	
		$("#listMessages").show(1500);			
		$("#thongbao").show(1500);
		$("#messages").show(1500);
	})

	$("#btnSendMessagesRoom").click(function(){
			socket.emit("user-send-messages-room", $("#txtMessagesRoom").val());
			$("#txtMessagesRoom").val("");
		});

	$("#btntaoRoom").click(function(){
		if($("#txtRoom").val().trim().length == 0)
			{
				alert("Bạn chưa nhập tên room");
				return false;
			}
		socket.emit("tao-room", $("#txtRoom").val());
		$("#txtRoom").val("");
	});


	// $("#btnRoom2").click(function(){
	// 	socket.emit("join-room2");
	// });

	// $("#btnRoom3").click(function(){
	// 	socket.emit("join-room3");
	// });


});

// window.onload = function() {
// 	document.getElementById("fileSelector").addEventListener("change", function(){		
// 		submitImg();
// 	});

// 	socket.on('receivePhoto', function(data){
// 	document.getElementById("showPhoto").src = data.path
// 	});
// };
// function submitImg(){
// 	var selector 	= document.getElementById("fileSelector");
// 	var img 	= document.getElementById("review");

// 	var reader = new FileReader();
//         reader.onload = function (e) {
//             img.src = e.target.result;
//             socket.emit("sendPhoto", {base64:e.target.result});
//         }
//  	reader.readAsDataURL(selector.files[0]);
// }