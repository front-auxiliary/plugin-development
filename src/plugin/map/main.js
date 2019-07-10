export default class map {
     constructor(params){
       //初始化
       this.init();
     }

     init(){ 
        //echarts
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
          bmap: {},
          tooltip : {
            trigger: 'item'
         },
          visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
         },
         toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
          },
          series : [
            {
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '河南',value: Math.round(Math.random()*1000)},
                    {name: '云南',value: Math.round(Math.random()*1000)},
                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    {name: '湖南',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '山东',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '江苏',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '湖北',value: Math.round(Math.random()*1000)},
                    {name: '广西',value: Math.round(Math.random()*1000)},
                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '陕西',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '贵州',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '青海',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '海南',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            },
          ]
        }
        myChart.setOption(option);
        //地图
        var map = myChart.getModel().getComponent('bmap').getBMap();
        let provList = new Array(["黑龙江","#F09ABD"],["吉林省","#01933F"],["辽宁","#FAC300"],["内蒙古","#FCF502"],["河北","#F09ABD"],["北京","#FCF502"],["天津","#01933F"],["山东省","#FCF502"],["江苏","#D8EDDA"],["上海","#B9B4C8"],["浙江","#FCF502"],["福建","#FAC300"],["台湾","#F09ABD"],["广东","#FCF502"],["香港","#F09ABD"],["澳门","#F09ABD"],["海南","#F09ABD"],["广西","#FAC300"],["云南","#FCF502"],["西藏","#B9B4C8"],["新疆","#FAC300"],["甘肃","#01933F"],["青海","#F09ABD"],["四川","#FAC300"],["贵州","#01933F"],["重庆","#B9B4C8"],["湖南","#F09ABD"],["江西","#01933F"],["湖北","#FCF502"],["安徽","#FAC300"],["河南","#B9B4C8"],["陕西","#F09ABD"],["山西","#01933F"],["宁夏","#FAC300"]); //通过取色器获取各省颜色
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); //取北京作为中心点
        map.addControl(new BMap.NavigationControl()); // 缩放控件
        map.addControl(new BMap.ScaleControl()); // 比例尺
        map.addControl(new BMap.MapTypeControl({
          mapTypes:[BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]
      }));
        map.enableScrollWheelZoom();
        function getBoundary(provItem){    
          var bdary = new BMap.Boundary();
          bdary.get(provItem[0], function(rs){       //获取行政区域
            var count = rs.boundaries.length; //行政区域的点有多少个
            // if (count === 0) {
            //     alert('未能获取当前输入行政区域');
            //     return ;
            // }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                let ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: "#aaaaaa", fillColor: provItem[1]}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());      
            }    
          });   
        }

        setTimeout(function(){
          provList.forEach(function(item){
            getBoundary(item);
          });
        }, 500);
     }
    
     render(){
        
     }
}