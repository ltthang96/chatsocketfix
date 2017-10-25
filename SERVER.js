var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

//khai bao sql
var mysql =require("mysql");
    var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: '',
        database: 'test',
        port    : 3306
    });
    //check connect
    connection.connect(function(err) {
      if (err){ 
        console.log(err);
        return;}
      console.log("Connected!");
    });

server.listen(3000);

//mang user
var mangUsers=[]; 
var mangID=[];
var kq = {}; // tao mang user va ds thanh cong that bai
kq.datahtml = [];
//check user trong database
function checkuserdb(username, callback) {
    connection.query("select user_id from user where user_name = '" + username + "'", function(err, result, fields) {
        if (err) {
            console.log('this.sql', this.sql); //command/query
            callback(err, null);
        } else callback(null, result);
    });
}

//chen user moi register
function insertdb(user_name, user_password, user_email,fisrt_name,last_name, callback) {
    var sql="INSERT INTO user (user_name,user_password,user_email,fisrt_name,last_name) VALUES ('" + user_name + "','" + user_password + "','" + user_email + "','"+ fisrt_name + "','" + last_name + "' ) ";
    connection.query(sql, function(err, result, fields) {
        if (err) {
            console.log('this.sql', this.sql); //command/query
            callback(err, null);
        } else callback(null, result);
    });
}

//kiem tra login
function checkdangnhap(username, callback) {
        connection.query("select * from user where user_name ='" + username + "'" , function(err, result, fields) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

io.on("connection",function(socket){
    console.log("Có "+socket.id+ " kết nối đến server");

    //nhan thong tin user tu client
    socket.on("Client-send-user-info",function(thongtinuser){
        checkuserdb(thongtinuser.username, function(err, result) {
                if (err) {
                    console.log('err-register:' + err);
                } else {
                    if (typeof result !== 'undefined' && result.length > 0) {
                        // user đã có
                       socket.emit("server-send-dki-thatbai");  
                    } else {
                        //user chưa có
                        var hashPassword = bcrypt.hashSync(thongtinuser.password, salt);
                        console.log(hashPassword);
            //             bcrypt.compareSync(thongtinuser.password, hashPassword, function (err, res) {
                        //     // res == true
                        //     console.log('equal')
                        //     console.log(res)
                        // });
                        console.log('client ' + socket.id + ' vua thuc hien dang ky user ' +thongtinuser.username+' '+thongtinuser.password );
                        insertdb(thongtinuser.username, hashPassword, thongtinuser.email,thongtinuser.fisrtname,thongtinuser.lastname, function(err, result) {
                            if (err){
                                console.log('err-insert' + err)
                            }
                            else {
                               socket.emit('server-send-dki-thanhcong');
                            };
                            });
                    }
                }
            });
    });
//event login

    socket.on("login", function(thongtinuser){
        var user = thongtinuser.username;
        checkdangnhap(thongtinuser.username,function(err,data)
        {
        // connection.query("select * from user where user_name ='" + user_name + "'" , function(err, result, fields) {
             // and user_password ='" + user_password + "'
            if (err) {
                console.log('err:' + err);
                console.log('error SQL');
            } else if(data.length>0){ //co username trong database
                    // var hashPassword = bcrypt.hash(thongtinuser.password, salt);
              //           console.log(hashPassword);
                    var res =bcrypt.compareSync(thongtinuser.password, data[0].user_password);
                    // bcrypt.compareSync(thongtinuser.password, data[0].user_password, function (err, res){ 
                    if(res==true){
                        console.log('login success!');  //dung pass
                        // var kq={};
                        kq.result=1;
                        kq.alert="Login successful!";
                        socket.username = thongtinuser.username;
                        socket.name = thongtinuser.lastname;
                        socket.nameuser= data[0].last_name +" "+data[0].fisrt_name;
                        mangID.push(socket.id);
                        kq.nameuser=socket.nameuser;
                        kq.iduser=socket.id;
                        kq.username = user;
                        kq.reason=socket.nameuser+" vừa mới đăng nhập";
                        console.log(socket.username+" " +socket.nameuser);
                        var ttuser={};
                        ttuser.idObj = socket.id;
                        ttuser.nameObj = user;
                        ttuser.nameuserobj = socket.nameuser;
                        // console.log(ttuser);
                        kq.datahtml.push(ttuser);
                        console.log(kq.datahtml);
                        io.emit('all-recived', kq);
                        socket.emit('server-send-login',kq);
                    }
                    else{
                        console.log('emaill and password does not match!'); //sai pass
                        // var kq={};
                        kq.result=0;
                        kq.reason="Email and password does not match!";
                        socket.emit('server-send-login',kq);
                    }
                }
                else{
                    console.log("Email not exist!"); //khong co username
                        // var kq={};
                    kq.result=0;
                    kq.reason="Email not exist!";
                    socket.emit('server-send-login',kq);
                    }
                
        });
    });

    socket.on('sender-send-private', function(data) {
        //console.log(data.guiden);
        if (data.guiden != socket.id) {
            // var check_tmp = checkusername(socket); // đá đang kết nối ra
            // if (check_tmp == 1) {
                //console.log('gui tn private' );
                var tmp = {};
                tmp.nameuser = socket.username;
                tmp.nameuserobj = socket.nameuser;
                tmp.noidung = data.noidung;
                tmp.iduser = socket.id;
                //console.log(tmp);
                socket.broadcast.to(data.guiden).emit('server-send-oneclient', tmp);
                //socket.to(data.guiden).emit('server-send-private', tmp);
                //io.to(data.iduser).emit('server-send-oneclient', tmp);
            }
        
        /*tmp.username = socket.username;
        tmp.noidung = data.noidung;
        tmp.room = data.iduser;
        socket.join(data.guiden);
        io.sockets.in(data.guiden).emit("server-chat-private", tmp);*/
    });

    socket.on('disconnect', function() {
        console.log(' user da ngat ket noi ' + socket.id);
        // if(checkusername(socket) == 0 ) return;
        kq.result = 1;
        kq.reason = ' user ' + socket.username + 'vua out ra';
        kq.datahtml = kq.datahtml.filter(function(el) {
            return el.idObj !== socket.id;
        });
        socket.broadcast.emit('all-recived', kq);
    });

    
    // socket.on("logout",function(){
    //  mangUsers.splice(
    //      mangUsers.indexOf(socket.Username),1
    //      );
    //  socket.broadcast.emit("server-send-ds-user",mangUsers);
    // });
    // 
    socket.on('logout', function() {
    console.log(' client ' + socket.id + ' da logout');
    kq.result = 1;
    kq.reason = socket.nameuser + ' vừa đăng xuất';
    kq.datahtml = kq.datahtml.filter(function(el) {
        return el.idObj !== socket.id;
    });
    socket.broadcast.emit('all-recived', kq);
    });

    socket.on("leave-room",function(){
        socket.leave(socket.Phong);
        // console.log(data);
        // console.log(socket.adapter.rooms);
        var mang=[];
        for(r in socket.adapter.rooms){
        console.log(r);
        if(mangID.indexOf(r)<0)
        {
         mang.push(r)
        }
        }
        io.sockets.emit("server-send-ds-room", mang);
        // 
    });

    socket.on("user-send-messages",function(data){

        io.sockets.emit("server-send-messages", {un:socket.nameuser, nd:data});
    });

    socket.on("chatting",function(){
        var s = socket.nameuser+" đang nhập...";
        socket.broadcast.emit("dang-nhap",s);
    });

    socket.on("offchat",function(){
        io.sockets.emit("stop-chat");
    });

    socket.on("join-room1",function(){
        socket.join("Room 1");
        socket.Phong="Room 1";
        socket.emit("server-send-room","Room 1")
        // console.log(socket);
        // console.log(socket.adapter.rooms);
    });

    socket.on("join-room",function(data){
        socket.leave(socket.Phong);
        console.log(socket.Phong);
        socket.join(data);
        socket.Phong=data;
        var mang=[];
        for(r in socket.adapter.rooms){
        console.log(r);
        if(mangID.indexOf(r)<0)
        {
         mang.push(r)
        }
    }
    io.sockets.emit("server-send-ds-room", mang);
        socket.emit("server-send-room",data);
    });

    socket.on("tao-room",function(data){
    // console.log(data);
    socket.join(data);
    socket.Phong= data;

    var mang=[];
    for(r in socket.adapter.rooms){
        console.log(r);
        if(mangID.indexOf(r)<0)
        {
         mang.push(r)
        }
    }
    io.sockets.emit("server-send-ds-room", mang);
    socket.emit("server-send-room",data)
        console.log(socket.adapter.rooms);
    });
    // socket.on("join-room2",function(){
    //  socket.join("room2");
    // });

    // socket.on("join-room3",function(){
    //  socket.join("room3");
    // });
    
    socket.on("user-send-messages-room",function(data){
        io.sockets.in(socket.Phong).emit("server-chat-room",{un:socket.nameuser, nd:data});
    });

    // socket.on("room-chatting",function(){
    //     var s = socket.Username+" đang nhập...";
    //     socket.broadcast.emit("room-dang-nhap",s);
    // });

    // socket.on("room-offchat",function(){
    //     io.sockets.emit("room-stop-chat");
    // });

});

app.get("/", function(req,res){
    res.render("trangchu");
});