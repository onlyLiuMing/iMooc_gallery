//通用函数   
    function $(id){   //用class取到的是数组
        var temp = id.substr(0,1) == "." ? "getElementsByClassName" : "getElementById";
        return document[temp](id.substr(1));    
    }


//输出所有海报
    var Odata = data;
    function  addPhotos(){
        var templete = $("#photo-warp").innerHTML;
        // console.log(templete);//显示模板内容
        var html = [];
        for( s in data){ //其实相当于for的正当遍历写法
         // 逐个替换  当替换一个之后，用其返回值进行再次替换
            var _html = templete
                            .replace("{{index}}", s)
                            .replace("{{img}}",Odata[s].img)
                            .replace("{{caption}}", Odata[s].caption)
                            .replace("{{desc}}", Odata[s].desc);
            html.push(_html);
        }
        $("#photo-warp").innerHTML = html.join("");

        //在这里触发  排序海报函数 reSort（）
        reSort(Random([0,Odata.length]));
    }
addPhotos();

//排序海报
    function reSort( n ){
        //获取所有的图片，并把它们的photo-center样式去掉
        var _photo = $(".photo-warp");
        var photos = [];
        var phtots_warp = [];
        for( var i = 0;i<_photo.length;i++){
            _photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/," ");
            
            //下面两句的赋值效果是一样的！！！！对于空数组来说
            // photos.push(_photo[i]);
            photos[i] = _photo[i];

        }

        //给其中一个图片附上photo-center样式
        var photo_center = $("#photo_" + n);
        photo_center.className += " photo-center";
        photo_center = photos.splice(n,1)[0];//将中间的图片筛选出来，并且删除掉
        // console.log(photos.length);

        //将剩下的图片分成左、右两个区域
        var photos_left = photos.splice(0,Math.ceil(photos.length/2));
        var photos_right = photos;
        // console.log(photos);
        //不同区域的图片自由变化  位置  角度
        for(i in photos_left){
            photos_left[i].style.left = Random(range().left.x)+"px";
            photos_left[i].style.top = Random(range().left.y)+"px";
            photos_left[i].style.transform = "rotate("+ Random([-30,150])+"deg)";
        }

        for(i in photos_right){
            photos_right[i].style.left = Random(range().right.x)+"px";
            photos_right[i].style.top =  Random(range().right.y)+"px";
            photos_right[i].style.transform = "rotate("+ Random([-30,150])+"deg)";
        }

    }

    //随机生成值函数
    function Random( temp ){
        var max = Math.max(temp[0],temp[1]);
        var min = Math.min(temp[0],temp[1]);
        var diff = max - min;
        var numb = parseInt(Math.random() * diff + min) ;//可以返回显示的范围，即便是负数也可以
        return numb;
    }

//海报运动的范围
    function range(){
        //因为浏览器的宽和高是变动的，因此不要用！！
        // var clientW = document.documentElement.clientWidth;
        // var clientH = document.documentElement.clientHeight;
        // console.log(clientW);
        //元素运动的范围设置
        var range = { left:{x:[],y:[]} ,right:{x:[],y:[]} };
        //外部框体的大小
        var warp = { w:$(".main")[0].offsetWidth , h:$(".main")[0].offsetHeight}
        // console.log(warp);
        //照片的大小
        var photo = { w:$(".photo-side")[0].offsetWidth, h:$(".photo-side")[0].offsetHeight}
        // console.log(photo);
        //添加到范围设置之中
        range.warp = warp;
        range.photo = photo;
        // console.log(range);

        range.left.x = [0 - photo.w/2, warp.w/2 - photo.w/2];
        range.left.y = [0 - photo.h/2, warp.h - photo.h/2];

        range.right.x = [warp.w/2 + photo.w/2, warp.w - photo.w/2];
        range.right.y = [0 - photo.h/2, warp.h - photo.w/2];
        // console.log(range);
        return range;//此函数是  执行函数  所以直接返回其中的值进行运用
    }


//反面控制函数
        function goBack(event){
            var cal = event.className;
            if( /photo-font/.test(cal)){
//                console.log(typeof cal);
              cal = cal.replace(/photo-font/,"photo-back");
            }else{
                cal = cal.replace(/photo-back/,"photo-font");
            }
            event.className = cal;
        }
