var http=require('http');
var fs=require('fs');
var root="D:/nodeproject/github-project/krpano-inwalk/"
//开启服务
var server=http.createServer(function(req,res){
    var url=req.url;
    var file = root+url;
    fs.readFile(file,function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }
    })
}).listen(8888);
console.log('服务器开启成功');