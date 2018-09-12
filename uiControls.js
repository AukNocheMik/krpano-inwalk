/// 调用接口获取当前对象的全景图，然后xml文件中,动态控制xml文件的数据;、
/// 全景图切片、热点数据;
/// 
function init(){
const ans = this.requestProcess('http://dev.zhixianshi.com/v6/inwalk/overview?inwalkId=' + '5b7a5eaafb4ffe0058b282b0' + '&nocache=true','GET');
console.log(ans);
}

function requestProcess(src, method = 'POST'){
    const request = new XMLHttpRequest();
    request.open(method, src);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    return new Promise((resolve, reject) => {
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                picOrigin = work.resetUrl(JSON.parse(request.responseText));

                const picFormat = picOrigin.navigation.map((pic) => {
                    return pic;
                });
                picOrigin.pictures = picFormat;
                resolve(picOrigin);
            } else {
                const resp = request.responseText;
                reject(JSON.parse(resp));
            }
        };
        request.send();
    });
}


function loadxml(xmlFile)           // 当获取到xml格式的后端数据之后，开始写入krpano中;
{
 var xmlDoc;
    if(window.ActiveXObject)
    {
        xmlDoc    = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async    = false;
        xmlDoc.load(xmlFile);
    }
    else if (document.implementation&&document.implementation.createDocument)
    {
        xmlDoc    = document.implementation.createDocument("","",null);
        xmlDoc.load(xmlFile);
    }
    else
    {
        return null;
    }
    
    return xmlDoc;

}
init();