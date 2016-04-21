(function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();//2016
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();//1
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  //生成三个月的数据
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);//得到'2016-01-01'
    // console.log(datStr);
    returnData[datStr] = Math.ceil(Math.random() * seed);//生成随机数值然后向上舍入
    dat.setDate(dat.getDate() + 1);//循环
  } 
  // console.log(returnData);
  return returnData;

}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
var aqi_chart = document.getElementsByClassName("aqi-chart-wrap");//数组
function renderChart() {
  // console.log(chartData);
  var text='';
  for (var city_data in chartData) {
   aqi_chart[0].style.cssText = 
   "display: flex; justify-content: center;align-items: flex-end; align-content:center;" +
   "margin: 10px auto; padding: 10px 10px 0;border: 1px solid rgb(152, 150, 150);height: 490px;background-color: rgb(235, 243, 251);";
   color = '#'+(Math.random()*0xfff<<0).toString(16);
   text += '<div style = "height:'+chartData[city_data]+'px; margin:0 2px; width: 300px;background-color:'+color+';"title="'+city_data+':'+chartData[city_data]+'"></div>';
 }
 aqi_chart[0].innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
 function graTimeChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowGraTime === this.value) {
    return;
  }
  // 设置对应数据
  pageState.nowGraTime = this.value;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
 function citySelectChange() {
  // 确定是否选项发生了变化 
  if ( pageState.nowSelectCity == this.value) {
    return;
  }else {
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 * 一一对应
 */
 var form_gratime = document.getElementById("form-gra-time");
 function initGraTimeForm() {
  var radio = form_gratime.getElementsByTagName("input");
  for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener("click", graTimeChange, false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
 var city_select = document.getElementById("city-select");
 function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项 
  var cityList ='';
  for(var city in aqiSourceData){
    cityList += '<option>'+city+'</option>'; 
  }
  city_select.innerHTML = cityList;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.addEventListener('change',citySelectChange,false);
}


/**
 * 初始化图表需要的数据格式
 */
 function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city_value = aqiSourceData[pageState.nowSelectCity];//获取当前的城市的数组
  // console.log(city_value);
  if (pageState.nowGraTime == "day") {
    chartData = city_value;
  }
  if (pageState.nowGraTime == "week") {
    chartData = {};
    var valueSum = 0;//污染指数
    var daySum = 0;
    var week = 0;
    for (var date in city_value) {
      valueSum +=city_value[date];//污染指数循环相加
      daySum++;
      var day = new Date(date).getDay();//获取星期几
      if (day == 6) {
        week++;
        var week_data = '第'+week+'周,平均：'
        chartData[week_data] = Math.ceil(valueSum/daySum);
        // console.log(chartData);
        daySum = 0;
        valueSum = 0;
      }
    }
    if (valueSum>0) {//一个月的最后一周不满七天
      week++;
      chartData[week_data] = Math.ceil(valueSum/daySum);       
    };
  }
  if (pageState.nowGraTime == "month") {
   chartData = {};
    var valueSum = 0;//污染指数
    var daySum = 0;
    var curMonth = -1;
    for (var date in city_value) {
      valueSum +=city_value[date];
      daySum++;
      var month = new Date(date).getMonth();
      if (month !== curMonth) {
        month++;
        var month_data = '第'+month+'个月,平均：'
        chartData[month_data] = Math.ceil(valueSum/daySum);
        daySum = 0;
        valueSum = 0;
      }
    }
  }
}


/**
 * 初始化函数
 */
 function init() {//函数要从主函数开始看
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();

  renderChart();
}
init();
})();