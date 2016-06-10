//Fake map information
var rectangleData = [
  {"rx":0,"ry":20,"height":5, "width":10,"id":"studio1"},
  {"rx":20, "ry":70,"height":5,"width":15,"id":"studio2"},
  {"rx":69, "ry":69,"height":5,"width":5,"id":"studio3"}];

//html object that the map is contained in
var container = "#map-well";

//initialize map
function init(width, height){
  //Container for map and map information
  var svgContainer=d3.select(container).append("svg")
    .attr("width", width)
    .attr("height",height)
    .attr("id", "svgMapContainer")
    .style("border","1px solid black")
    .on("click", function(){
      marker.attr("cx",d3.mouse(this)[0]+"px").attr("cy",d3.mouse(this)[1]+"px");
      marker.style("visibility", "visible");
    });

    //Add map and add to svgContainer
    var level1= d3.xml("../d3_files/level1.svg", "image/svg+xml", function(xml) {
      svgContainer.node().appendChild(document.importNode(xml.documentElement, true));
      svgContainer.select('svg')
          .attr("cx",0)
          .attr("cy",0)
          .attr('height', height)//TODO:Fix scaling, currently it doesn't fit to container
          .attr('width', width)
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("id","map");
    });

  var tooltip = svgContainer
    .append("text")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "red")
    .attr("visibility","hidden");

  var marker = svgContainer
    .append("circle")
    .attr("r", "0.5in")
    .attr("fill", "red")
    .style("visibility","hidden")
    .attr("id","marker");


    //Rectangles represent studio spaces
  var rectangles = svgContainer.selectAll("rect")
    .data(rectangleData)
    .enter()
    .append("rect")
    .attr("x", function (d) { return (d.rx/10)*(height/1088)+"in"; })//Assumes that dimensions are in ft, 500 is the pixel height of map
    .attr("y", function (d) { return (d.ry/10)*(height/1088)+"in"; })
    .attr("height", function (d) { return (d.height/10)*(height/1088)+"in"; })
    .attr("width", function (d) { return (d.width/10)*(height/1088)+"in"; })
    .attr('id',function (d) { return d.id; })
    .attr("floor", function(d) { return d.floor; })
    .style("color","blue")
    .style("opacity",0.5)
    .style("cursor","pointer")
    .on("mouseover",function(d){
      d3.select(this).transition().style("opacity", 1);
    })
    .on("click", function(d){
      tooltip.attr("x",d3.mouse(this)[0]+10+"px").attr("y",d3.mouse(this)[1]+30+"px");
      tooltip.text(d.id);
      return tooltip.style("visibility", "visible");
    })
    .on("mouseout",function(){
      d3.select(this).transition().style("opacity", 0.5);
    });
};

function showFloor1(){
  d3.select(container).selectAll("svg")
    .attr("visibility","visible");
}

function hideFloor1(){
  d3.select(container).selectAll("svg")
    .attr("visibility","hidden");
}
//ObjId is the name of the object
function highlightItem(objId){
  d3.select(container).select("rect#" + objId)
  .attr('fill',"red")
  .style("opacity",1);
}

function dehighlightItem(objId){
  d3.select(container).select("rect#" + objId)
  .attr('fill',"none")
  .style("opacity",0.5);
}