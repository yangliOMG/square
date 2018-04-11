俄罗斯方块

### 业务代码小结：
* 用es6实现俄罗斯方块游戏
* 掌握游戏实现核心，注意步骤层层的逻辑

### gulp使用小结：
#### 增加打包img文件夹到server中
* 修改tasks->browser.js（好像不写也行？） ,build.js（增加img）
* 增加tasks->img.js  _return gulp.src('app/img/*')_  监听格式     _.pipe(gulp.dest('server/public/img'))_ 打包路径

#### 将socketio.js添加到server中
* 直接在index.ejs中添加js，会找不着的，因为tasks任务流程中没有将其打包，上面img同理。
* 打开tasks->scripts.js， 直接在 _gulp.src(['app/js/index.js'])_ 中添加socketio.js会导致其内容被解析转译导致报错（？），直接在index.js中import也会如此。
* 在最后两行添加  _.pipe(gulp.src(['app/js/socket-io.js']))_   _.pipe(gulp.dest('server/public/js'))_ 可以避免被转译

#### gulp启动项目
* 在根目录 __gulp --watch__

### websocket使用小结：
* 将wsServer.js放到server/routes/目录下，进入该目录，__node wsServer.js  启动websocket服务__ ，注意端口别被占用
* socket.io支持自定义消息类型，使用起来很方便
```
io.on('connection', function (socket) {
  
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect',function(){
	io.emit('disconnect',  'message')
  })
});
```
