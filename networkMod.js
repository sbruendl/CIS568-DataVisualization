

function simulate(data,svg)
{
    const width = parseInt(svg.attr("viewBox").split(' ')[2])
    const height = parseInt(svg.attr("viewBox").split(' ')[3])
    const main_group = svg.append("g")
        .attr("transform", "translate(0, 50)")
        .style("font", "130px times")


   //calculate degree of the nodes:
    let node_degree={}; //initiate an object
   d3.map(data.links, (d)=>{
       if(d.source in node_degree)
       {
           node_degree[d.source]++
       }
       else{
           node_degree[d.source]=0
       }
       if(d.target in node_degree)
       {
           node_degree[d.target]++
       }
       else{
           node_degree[d.target]=0
       }
   })

   //max citations is 277 and min is 0. I took 28 as a max to show
   //tens of citations in the radius. then I changed it as it wasn't working
   // I manually chose the range
    const scale_radius = d3.scaleSqrt()
        .domain(d3.extent(data.nodes, d=> d.Citations))
        .range([10,60])
    const scale_link_stroke_width = d3.scaleLinear()
        .domain(d3.extent(data.links, d=> d.value))
        .range([1,5])


    //console.log(Object.values(node_degree))



    //const color = d3.scaleOrdinal(d3.schemeCategory10);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const link_elements = main_group.append("g")
        .attr('transform',`translate(${width/2},${height/2})`)
        .selectAll(".line")
        .data(data.links)
        .enter()
        .append("line")

    const node_elements = main_group.append("g")
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll(".circle")
        .data(data.nodes)
        .enter()
        .append('g')
        //apply classes
        //.attr("class", d=> d.CountryName)
        //IN ORDER TO GET THIS TO WORK, I HAVE TO DELETE FAULTY NODES
        .attr("class",function (d){
            console.log(d.Country.toString())
            return "gr_"+d.Country.toString()})
        .on("mouseenter",function (d,data){
            node_elements.classed("inactive",true)
            d3.selectAll(".gr_"+data.Country.toString()).classed("inactive",false)
            console.log(data.Country.toString())
        })
        .on("mouseleave", (d,data)=>{
            d3.selectAll(".inactive").classed("inactive",false)
        })

        

    node_elements.append("circle")
        .attr("r",  (d,i)=>{
            console.log(node_degree[d.EID])
            return scale_radius(d.Citations)
            //i tried running scale_radius(d.Citations)
            // but the graph explodes to the perimeter and disregards
            // the edges it created...

            //the previous code returned the size as the amount of edges
            //console.log(node_degree[d.id])
            //return scale_radius(node_degree[d.id])
        })
        .attr("id",  d=> d.EID)
        .attr("fill",  d=> color(d.Country))

    node_elements.append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(d=>d.Country)
        .style("font-size", "10px")

    let ForceSimulation = d3.forceSimulation(data.nodes)
        .force("collide",
            d3.forceCollide().radius((d,i)=>{return scale_radius(d.Citations)*1.6}))    //changed from node_degree[i]
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody())
        .force("link",d3.forceLink(data.links)
            .id(function (d){
                return d.EID})
            //.id(d=>d.index)
            //.distance(d=>d.value)
            //.strength(d=>d.value*.1)
        )
        .on("tick", ticked);

    function ticked()
    {
    node_elements
        .attr('transform', (d)=>`translate(${d.x},${d.y})`)
        link_elements
            .attr("x1",d=>d.source.x)
            .attr("x2",d=>d.target.x)
            .attr("y1",d=>d.source.y)
            .attr("y2",d=>d.target.y)

        }

    svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.5, 8])
        .on("zoom", zoomed));
    function zoomed({transform}) {
        main_group.attr("transform", transform);
    }




}
