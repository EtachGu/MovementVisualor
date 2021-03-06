'use strict';

/* Controllers */

var stavrCtrl = angular.module('stavrControllers', []);

stavrCtrl.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

stavrCtrl.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);



stavrCtrl.controller('ContentCtrl',['$scope','$routeParams',function($scope,$routeParams){
    $scope.$on('updateData',function(evt, data){

    });
}]);


/*
 * Three View  for   ViewCtrl => OverView
 *                   View1Ctrl => View1
 *                   View2Ctrl => View2
 */
stavrCtrl.controller('ViewCtrl',['$scope','$routeParams',function($scope,$routeParams){
   $scope.$on('updateData',function(evt, data){

   });
}]);
stavrCtrl.controller('View1Ctrl',['$scope','$routeParams',function($scope,$routeParams){
    $scope.$on('addVisualToolBox',function () {
        var seqBox = document.getElementById('seqBox');
    });
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
    });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

}]);
stavrCtrl.controller('View2Ctrl',['$scope','$routeParams',function($scope,$routeParams){

}]);

/*
 *   control the main side bar 
 */
stavrCtrl.controller('mainSideBarCtrl',['$scope','$uibModal','$log',function($scope, $uibModal, $log){
    $scope.visualToolChoose = function(t){
        switch (t){
            case 'Line': callModalFun();
                break;
            default:

        }
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    var callModalFun = function (templateUrlHtml,size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'template/visualtoolhtml/visualtool.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        // modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        // }, function () {
        //     $log.info('Modal dismissed at: ' + new Date());
        // });
    };

}]);

stavrCtrl.controller('MapCtrl',['$scope','MapViewerSever','StopEventlayerSever',function ($scope,MapViewerSever,StopEventlayerSever) {

    // $(".connectedSortable").sortable({
    //     placeholder: "sort-highlight",
    //     connectWith: ".connectedSortable",
    //     handle: ".box-header, .nav-tabs",
    //     forcePlaceholderSize: true,
    //     zIndex: 999999
    // });
    // $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");

    var  map = MapViewerSever.map ;
    var divMap = document.getElementById('map');
    map.setTarget(divMap);

    $scope.$on('updateTrajectory', function(evt, url) {

        var trajectoryLayer = new ol.layer.Vector();
        trajectoryLayer.setSource( new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON()
        }));

        map.addLayer(trajectoryLayer);
     //   map.render();
    });

    // remove Layers
    $scope.$on('removeTrajectory', function (e,data) {

    });


    //add EventLayer
    var styleFunction = function (feature, resolution) {
        var startStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#32CD32'
                    })
                })
            });

        return [startStyle];

    };

    // var urlgeoJsonFileSet = ["luoyuRoad.geojson","track20196.geojson","track18308.geojson","track19701.geojson"];
    // //var urlgeoJsonFileSet = ["luoyuRoad.geojson","track18308_8.geojson","track20196_19.geojson"];
    // var d3color = d3.scale.category10();
    // for(var i=0;i<urlgeoJsonFileSet.length;i++)
    // {
    //     var eventLayer = new ol.layer.Vector();
    //     eventLayer.setSource( new ol.source.Vector({
    //         url: urlgeoJsonFileSet[i],
    //         format: new ol.format.GeoJSON()
    //     }));
    //     if(i>0){
    //         eventLayer.setStyle(new ol.style.Style({
    //             image: new ol.style.Circle({
    //                 radius: 8,
    //                 fill: new ol.style.Fill({
    //                     color: d3color(i)
    //                 })
    //             })
    //         }));
    //     }
    //     else {
    //         eventLayer.setStyle(new ol.style.Style({
    //             stroke: new ol.style.Stroke({
    //                 color: '#ff0000',
    //                 width: 1
    //             })
    //         }));
    //     }
    //
    //    // eventLayer.setStyle(styleFunction);
    //     map.addLayer(eventLayer);
    //
    // }


    var urlgeoJsonFileSet = ["luoyuRoad.geojson","track18308_8.geojson","track20196_19.geojson"];
    var d3color = d3.scale.category10();
    for(var i=5;i<urlgeoJsonFileSet.length;i++)
    {
        var eventLayer = new ol.layer.Vector();
        eventLayer.setSource( new ol.source.Vector({
            url: urlgeoJsonFileSet[i],
            format: new ol.format.GeoJSON()
        }));
        if(i==1){
            eventLayer.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: '#ff7f0e',
                        width: 3
                    })
                })

            }));
        }
        else if(i==2){
            eventLayer.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 8,
                    fill: new ol.style.Fill({
                        color: '#1f77b4'
                    })
                })
            }));
        }
        else {
            eventLayer.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#ff0000',
                    width: 1
                })
            }));
        }

        // eventLayer.setStyle(styleFunction);
        map.addLayer(eventLayer);

    }



    function getTableColumnValue(tableId, rowNumber, columnNumber) {
        var tableRef = document.getElementById(tableId);

        var elementRef = tableRef.rows[rowNumber].cells[columnNumber];
        var elementValue = '';

        if (elementRef.textContent) {
            // Firefox
            elementValue = elementRef.textContent;
        }
        else if (elementRef.innerText) {
            // IE
            elementValue = elementRef.innerText;
        }
        else {
            // Default
            elementValue = elementRef.innerHTML;
            var regExp = /<\/?[^>]+>/gi;

            elementValue = elementValue.replace(regExp, '');
        }

        //alert(elementValue);

        return elementValue;
    }


    // add Marker
    for(var i=0; i<0;i++)
    {
        var markerId = StopEventlayerSever();

        var pos = ol.proj.fromLonLat([114.3707, 30.52]);

        // Vienna marker
        var marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById(markerId),
            stopEvent: false
        });
        map.addOverlay(marker);
    }





}]);

stavrCtrl.controller('EventTimeGraphCtrl',['$scope','MapViewerSever','StopEventlayerSever',function($scope,MapViewerSever,StopEventlayerSever){
    // event time graph
    function renderTimeGraph()
    {
        if (data.length==geoJsonFileSet.length) {
            var color = d3.scale.category10();

            for(var i=0;i<data.length;i++)
            {
                data[i].name=trackName[i];
            }

            var width = document.getElementById("eventTimeGraph").offsetWidth
            if(width<=0) return;

            // create chart function
            var eventDropsChart = d3.chart.eventDrops()
                .eventLineColor(function (datum, index) {
                    return color(index);
                })
                .start(new Date(startTime))
                .end(new Date(endTime))
                .width(width)

            
            // bind data with DOM
            var element = d3.select("#eventTimeGraph").datum(data);

            // draw the chart
            eventDropsChart(element);
        }
    }

    var month = 30 * 24 * 60 * 60 * 1000;
    var hours = 60 * 60 * 1000;
    var endTime = 0;
    var startTime = Date.now();

    var geoJsonFileSet = ["track20196.geojson","track18308.geojson","track19701.geojson"];
    var trackName = ["taxi_20196","taxi_18308","taxi_19701"];
    var data = [];
    for(var i=0; i<geoJsonFileSet.length;i++)
    {
        var url = geoJsonFileSet[i];
        jQuery.getJSON(url,function(dataJson){

            var EventFeatures = dataJson;

            var EventFeatureSet = EventFeatures.features;
            var event = {
                name: name,
                dates: []
            };
            for(var i = 0; i<EventFeatureSet.length; i++)
            {
                var tableStr = jQuery.parseHTML(EventFeatureSet[i].properties.Description);
                var dateStrArry = tableStr[3].innerText.split('   ');
                var dateStr = dateStrArry[4].substr(5);
                var date = new Date(dateStr);
                var time = date.getTime();
                if(time<startTime) startTime = time;
                if(time>endTime) endTime = time;

                event.dates.push(date);
            }

            data.push(event);

            renderTimeGraph();
        });
    }
}]);

stavrCtrl.controller('RelationGraphCtrl',['$scope','MapViewerSever','StopEventlayerSever',function($scope,MapViewerSever,StopEventlayerSever){

    function name(d) { return d.name; }
    function group(d) { return d.group; }

    //var color = d3.scale.category10();
    var color = function(i){
        if(i==1) return '#1f77b4';
        else return '#ff7f0e';
    };
    function colorByGroup(d) { return color(group(d)); }

    var width = document.getElementById("relationGraph").offsetWidth
    var height = width * 0.5

    var svg = d3.select('#relationGraph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var node, link,nodes_labels;

    var voronoi = d3.geom.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .clipExtent([[-10, -10], [width+10, height+10]]);

    function recenterVoronoi(nodes) {
        var shapes = [];
        voronoi(nodes).forEach(function(d) {
            if ( !d.length ) return;
            var n = [];
            d.forEach(function(c){
                n.push([ c[0] - d.point.x, c[1] - d.point.y ]);
            });
            n.point = d.point;
            shapes.push(n);
        });
        return shapes;
    }

    var force = d3.layout.force()
        .charge(-2000)
        .friction(0.3)
        .linkDistance(20)
        .size([width,height]);

    force.on('tick', function() {
        node.attr('transform', function(d) { return 'translate('+d.x+','+d.y+')'; })
            .attr('clip-path', function(d) { return 'url(#clip-'+d.index+')'; });

        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        nodes_labels.attr("x", function (d) {  return d.x;  });
        nodes_labels.attr("y", function (d) {  return d.y;  });


        var clip = svg.selectAll('.clip')
            .data( recenterVoronoi(node.data()), function(d) { return d.point.index; } );

        clip.enter().append('clipPath')
            .attr('id', function(d) { return 'clip-'+d.point.index; })
            .attr('class', 'clip');
        clip.exit().remove()

        clip.selectAll('path').remove();
        clip.append('path')
            .attr('d', function(d) { return 'M'+d.join(',')+'Z'; });
    });

    d3.json('mbar/relation.json', function(err, data) {

        data.nodes.forEach(function(d, i) {
            d.id = i;
        });

        link = svg.selectAll('.link')
            .data( data.links )
            .enter().append('line')
            .attr('class', 'link')
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        node = svg.selectAll('.node')
            .data( data.nodes )
            .enter().append('g')
            .attr('title', name)
            .attr('class', 'node')
            .call( force.drag );



        node.append('circle')
            .attr('r', 20)
            .attr('fill', colorByGroup)
            .attr('fill-opacity', 0.5);

        node.append('circle')
            .attr('r', 4)
            .attr('stroke', 'black');

        //标签
        nodes_labels = svg.selectAll("text")
            .data(data.nodes)
            .enter()
            .append('text')
            .attr("dx", function (d, i) {
                return (data.nodes[i].name.length);
            })
            .attr("dy", 5)
            .attr("fill", "#fff")
            .style("font-size", 16)
            .text(function (d, i) {
                return data.nodes[i].name;
            });

        force
            .nodes( data.nodes )
            .links( data.links )
            .start();
    });

}]);

stavrCtrl.controller('StackedBarChartsCtrl',['$scope','MapViewerSever','StopEventlayerSever',function($scope,MapViewerSever,StopEventlayerSever){

    var w = document.getElementById("mbars").offsetWidth;
    if(w<=0) return;
    var h =0.6 * w;
    // var w = 530;                        //width
    // var h = 280;                        //height
    var padding = {top: 40, right: 40, bottom: 40, left:40};
    var dataset;
    //Set up stack method
    var stack = d3.layout.stack();

    d3.json("mbar/mperday.json",function(json){
        dataset = json;

        //Data, stacked
        stack(dataset);
        var color = d3.scale.category10();
        var color_hash = {
            0 : ["taxi_20196",color(0)],
            1 : ["taxi_18308",color(1)],
            2 : ["taxi_19701",color(2)]
        };


        //Set up scales
        var xScale = d3.time.scale()
            .domain([new Date(dataset[0][0].time),d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),8)])
            .rangeRound([0, w-padding.left-padding.right]);

        var yScale = d3.scale.linear()
            .domain([0,
                d3.max(dataset, function(d) {
                    return d3.max(d, function(d) {
                        return d.y0 + d.y;
                    });
                })
            ])
            .range([h-padding.bottom-padding.top,0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(d3.time.days,1);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);



        //Easy colors accessible via a 10-step ordinal scale
        var colors = d3.scale.category10();

        //Create SVG element
        var svg = d3.select("#mbars")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Add a group for each row of data
        var groups = svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class","rgroups")
            .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
            .style("fill", function(d, i) {
                return color_hash[dataset.indexOf(d)][1];
            });

        // Add a rect for each data value
        var rects = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("width", 2)
            .style("fill-opacity",1e-6);


        rects.transition()
            .duration(function(d,i){
                return 500 * i;
            })
            .ease("linear")
            .attr("x", function(d) {
                return xScale(new Date(d.time));
            })
            .attr("y", function(d) {
                return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
            })
            .attr("height", function(d) {
                return -yScale(d.y) + (h - padding.top - padding.bottom);
            })
            .attr("width", 15)
            .style("fill-opacity",1);

        svg.append("g")
            .attr("class","x axis")
            .attr("transform","translate(40," + (h - padding.bottom) + ")")
            .call(xAxis);


        svg.append("g")
            .attr("class","y axis")
            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis);

        // adding legend

        var legend = svg.append("g")
            .attr("class","legend")
            .attr("x", w - padding.right - 65)
            .attr("y", 25)
            .attr("height", 100)
            .attr("width",100);

        legend.selectAll("g").data(dataset)
            .enter()
            .append('g')
            .each(function(d,i){
                var g = d3.select(this);
                g.append("rect")
                    .attr("x", w - padding.right - 65)
                    .attr("y", i*25 + 10)
                    .attr("width", 10)
                    .attr("height",10)
                    .style("fill",color_hash[String(i)][1]);

                g.append("text")
                    .attr("x", w - padding.right - 50)
                    .attr("y", i*25 + 20)
                    .attr("height",30)
                    .attr("width",100)
                    .style("fill",color_hash[String(i)][1])
                    .text(color_hash[String(i)][0]);
            });


        // y axis text
        svg.append("text")
            .attr("transform","rotate(-90)")
            .attr("y", 0 - 5)
            .attr("x", 0-(h/2))
            .attr("dy","1em")
            .text("Number of Events");
        // x axis text
        svg.append("text")
            .attr("class","xtext")
            .attr("x",w/2 - padding.left)
            .attr("y",h - 5)
            .attr("text-anchor","middle")
            .text("Days");

        // title text
        svg.append("text")
            .attr("class","title")
            .attr("x", (w / 2))
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Number of Events per day.");

        //On click, update with new data
        d3.selectAll(".m")
            .on("click", function() {
                var date = this.getAttribute("value");

                var str;
                if(date == "2014-02-19"){
                    str = "mbar/19.json";
                }else if(date == "2014-02-20"){
                    str = "mbar/20.json";
                }else if(date == "2014-02-21"){
                    str = "mbar/21.json";
                }else if(date == "2014-02-22"){
                    str = "mbar/22.json";
                }else{
                    str = "mbar/23.json";
                }

                d3.json(str,function(json){

                    dataset = json;
                    stack(dataset);

                    console.log(dataset);

                    xScale.domain([new Date(0, 0, 0,dataset[0][0].time,0, 0, 0),new Date(0, 0, 0,dataset[0][dataset[0].length-1].time,0, 0, 0)])
                        .rangeRound([0, w-padding.left-padding.right]);

                    yScale.domain([0,
                            d3.max(dataset, function(d) {
                                return d3.max(d, function(d) {
                                    return d.y0 + d.y;
                                });
                            })
                        ])
                        .range([h-padding.bottom-padding.top,0]);

                    xAxis.scale(xScale)
                        .ticks(d3.time.hour,2)
                        .tickFormat(d3.time.format("%H"));

                    yAxis.scale(yScale)
                        .orient("left")
                        .ticks(10);

                    groups = svg.selectAll(".rgroups")
                        .data(dataset);

                    groups.enter().append("g")
                        .attr("class","rgroups")
                        .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
                        .style("fill",function(d,i){
                            return color(i);
                        });


                    rects = groups.selectAll("rect")
                        .data(function(d){return d;});

                    rects.enter()
                        .append("rect")
                        .attr("x",w)
                        .attr("width",1)
                        .style("fill-opacity",1e-6);

                    rects.transition()
                        .duration(1000)
                        .ease("linear")
                        .attr("x",function(d){
                            return xScale(new Date(0, 0, 0,d.time,0, 0, 0));
                        })
                        .attr("y",function(d){
                            return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
                        })
                        .attr("height",function(d){
                            return -yScale(d.y) + (h - padding.top - padding.bottom);
                        })
                        .attr("width",15)
                        .style("fill-opacity",1);

                    rects.exit()
                        .transition()
                        .duration(1000)
                        .ease("circle")
                        .attr("x",w)
                        .remove();

                    groups.exit()
                        .transition()
                        .duration(1000)
                        .ease("circle")
                        .attr("x",w)
                        .remove();


                    svg.select(".x.axis")
                        .transition()
                        .duration(1000)
                        .ease("circle")
                        .call(xAxis);

                    svg.select(".y.axis")
                        .transition()
                        .duration(1000)
                        .ease("circle")
                        .call(yAxis);

                    svg.select(".xtext")
                        .text("Hours");

                    svg.select(".title")
                        .text("Number of messages per hour on " + date + ".");
                });
            });


    });

}]);

stavrCtrl.controller('InfoTableCtrl',['$scope','$rootScope','ActiveDataFactory',function($scope,$rootScope,ActiveDataFactory) {

    $scope.$emit('MapUpdate');
    $scope.selectedrows = 0;
    $scope.tableData = "";
    $scope.showUrl = "";
    $scope.isNewTable = false;


    ActiveDataFactory.callDatabase().then(function (data) {
        $scope.tableData = data;
        $scope.isNewTable = true;
    },function (data) {
        alert(data);
    });
    
    
   $scope.refresh = function () {
       $scope.isNewTable = !$scope.isNewTable;
   }

    $scope.tableClick =function () {
        if($scope.table){
            $scope.selectedrows = $scope.table.rows('.selected').data().length;
        }
    }

    $scope.showSelect = function () {
        if($scope.table){
            var selectedData = $scope.table.rows('.selected').data();
            ActiveDataFactory.setSelectData(selectedData);
            $scope.showUrl = '#/overview/view1';
        }
    };

}]);


stavrCtrl.controller('queryCtrl',['$scope','$rootScope','$document',function($scope,$rootScope){
    $scope.queryClick = function(){
      var tID = "";
      var tOwner = "";
      var carNumber = document.getElementById("TNumber").value;
      var tStartTime = document.getElementById("TStartTime").value;
      var tEndTime = document.getElementById("TEndTime").value;
        var typeFeature = "MultiPoint";

      var url = "http://localhost:8080/DataVisualor/ServletJson?"+
          "TID=&"+tID +
          "TOwner=&"+tOwner+
          "TNumber="+carNumber+"&"+
          "TStartTime="+tStartTime+"&"+
          "TEndTime=" + tEndTime+"&"+
          "Type="+typeFeature;
        
        $rootScope.$broadcast('updateTrajectory',url);

        //UpdateTrajectoryDataSever.url = url;

        //UpdateTrajectoryDataSever.resouce.get({ TID:tID,TOwner:tOwner,TNumber:carNumber,TStartTime:tStartTime,TEndTime:tEndTime},function(data){},{});

    };
    $scope.ClearResult = function () {
        $rootScope.$broadcast('removeTrajectory');
    }
    
}]);

stavrCtrl.controller('SettingCtrl',['$scope','$rootScope',function($scope,$rootScope){

}]);
stavrCtrl.controller('HelpCtrl',['$scope','$rootScope',function($scope,$rootScope){

}]);

stavrCtrl.controller('ParameterCtrl',['$scope','$rootScope','$uibModal',function($scope,$rootScope,$uibModal){
   $scope.updateStackClick = function () {
       $rootScope.$broadcast('dataUpdate');
   }

    /*
     *
     */
    $scope.mapLayerEdit = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'template/mapLayerEdit/mapLayerEdit.html',
            controller: 'MapLayerMICtrl',
            size: 'lg',
            resolve: {}
        });
    }

    /*
     *
     */
    $scope.trajLayerEdit = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'template/mapLayerEdit/trajectoryLayerEdit.html',
            controller: 'TrajectoryLayerMICtrl',
            size: 'lg',
            resolve: {}
        });
    }


}]);

/*
 *   Modal Controller  for each Modal
 */
stavrCtrl.controller('ModalInstanceCtrl',['$scope','$uibModalInstance','$rootScope','items',function ($scope, $uibModalInstance,$rootScope,items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $rootScope.$broadcast('addVisualToolBox',url);
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
stavrCtrl.controller('MapLayerMICtrl',['$scope','$uibModalInstance','$rootScope',function ($scope, $uibModalInstance,$rootScope) {

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
stavrCtrl.controller('TrajectoryLayerMICtrl',['$scope','$uibModalInstance','$rootScope','MapViewerSever','ActiveDataFactory',function ($scope, $uibModalInstance,$rootScope,MapViewerSever,ActiveDataFactory) {
    var map = MapViewerSever.map;
    var layers = map.getLayers().getArray();
    var layerSet = [];
    for(var i=1;i<layers.length;i++)
    {
        var layer = layers[i];
        var layerIntance ={};
        layerIntance.id = i;
        layerIntance.name = layer.get('name');
        layerIntance.color = "color:"+ layer.get('color');
        layerIntance.type = layer.get('type');
        layerIntance.date = layer.get('date');
        layerIntance.number = layer.getSource().getFeatures().length;
        layerSet.push(layerIntance);
    }

    $scope.LayerSet = layerSet;

    $scope.layerClick = function (ele,data) {

    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

/*
 *  Just for test Controller
 */
stavrCtrl.controller('Ctrl1',['$scope','$rootScope',function($scope,$rootScope){
    $scope.click = function(){
        $rootScope.$broadcast('Update',  "CCC");
    }
}]);
stavrCtrl.controller('Ctrl2',['$scope','$rootScope',function($scope,$rootScope){
    $scope.content = "AAA";
    $rootScope.$on('Update',function(e,c){
        $scope.content = c;
    });
}]);








