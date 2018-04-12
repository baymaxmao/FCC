//设置默认经纬度，因为getCurrentPosition是异步函数，很可能出现无取值情况,所以只能将
//发起请求函数放在内部，但是被墙时不能正确返回取值。
var latitude=39.908772070374596; //经度
var longitude=116.40717000000001;//纬度
var key="fa601876c75a441bc0f821f95eb596d0";//天气预报API接口key
var tod;//获取当日天气对象
var pre;//获取预测天气对象
var count=0;
var icon={
    "晴":"weathers/sunny.gif",
    "阴":"weathers/clouds.png",
    "多云":"weathers/clouds.png",
    "阵雨":"weathers/rain.png",
    "雷阵雨":"weathers/rain.png",
    "雷阵雨伴有冰雹":"weathers/rain.png",
    "雨夹雪":"weathers/rsnow.gif",
    "小雨":"weathers/rain.png",
    "中雨":"weathers/rain.png",
    "大雨":"weathers/rain.png",
    "暴雨":"weathers/rain.png",
    "大暴雨":"weathers/rain.png",
    "特大暴雨":"weathers/rain.png",
    "阵雪":"weathers/snow.gif",
    "小雪":"weathers/snow.gif",
    "中雪":"weathers/snow.gif",
    "大雪":"weathers/snow.gif",
    "暴雪":"weathers/snow.gif",
    "雾":"weathers/clouds.png",
    "冻雨":"weathers/rain.png",
    "沙尘暴":"weathers/dot.gif",
    "小雨-中雨":"weathers/rain.png",
    "中雨-大雨":"weathers/rain.png",
    "大雨-暴雨":"weathers/rain.png",
    "暴雨-大暴雨":"weathers/rain.png",
    "大暴雨-特大暴雨":"weathers/rain.png",
    "小雪-中雪":"weathers/snow.gif",
    "中雪-大雪":"weathers/snow.gif",
    "大雪-暴雪":"weathers/snow.gif",
    "晴转阴":"weathers/clouds.png",
    "阴转多云":"weathers/clouds.png",
    "小雨转阴":"weathers/rain.png",
    "小雨转中雨":"weathers/rain.png",
    "中雨转小雨":"weathers/rain.png",
    "浮尘":"weathers/dot.gif",
    "扬沙":"weathers/dot.gif",
    "强沙尘暴":"weathers/dot.gif",
    "阴转多云":"weathers/partly-cloudy-day.png",
    "多云转阴":"weathers/partly-cloudy-day.png",
    "霾":"weathers/clouds.png",
};//定义对应天气的图标表示
function success(position){
         latitude=position.coords.latitude;
         longitude=position.coords.longitude;
    //调用聚合数据提供的全国天气预报API（根据经纬度查询天气）
    $.ajax({
        dataType: 'jsonp',
        url: 'http://v.juhe.cn/weather/geo?lon='+longitude+'&lat='+latitude+'&format=&dtype=&key=fa601876c75a441bc0f821f95eb596d0',
        type: 'GET',
        success:function(data,textStatus,xhr){
            //quote=JSON.parse(data);返回的data是json数据；
            tod=data.result.today;
            pre=data.result.future;
            console.log(tod);
            console.log(pre);
            //渲染页面-今日天气
            //*测试$('p')和<p></p>的区别
            //console.log($($(".weather-tod").children("p")[1]));
            //  $(".weather-tod").children("p")[1].innerHTML="城市："+tod.city;
            $($(".weather-tod").children("p")[1]).text("城市："+tod.city);
            $($(".weather-tod").children("p")[2]).text("天气："+tod.weather);
            $($(".weather-tod").children("p")[3]).text("温度："+tod.temperature);
            $($(".weather-tod").children("p")[2]).append('<img class="tod"/>');
             $(".tod").attr('src',icon[tod.weather]);
            //渲染页面-未来天气
            //jquery
            for(var key in pre){
                day=pre[key];
                if(count != 0){
                    $(".c-content").append('<div class="col-md-4 text-center">'+day.week+'</div>'+'<div class="col-md-4 text-center">'+day.weather+'<img id="images'+count+'" src=""/></div>'+'<div class="col-md-4 text-center">'+day.temperature+'</div>');
                       $("#images"+count).attr('src',icon[day.weather]);
                }
                 count++;
            }

        }
    });//ajax
 }

function error(err){
    alert("网络异常，请翻墙!");
}
$(document).ready(function(){
    //根据浏览器获取经纬度信息-h5功能
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);//navigator
    }
});//$
