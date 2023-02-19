    let svg = d3.select('svg#main')
    let X = d3.range(0,1000,100)
    d3.csv("download.csv").then(data=>{
        // get x and y
        const x = data.map(d=>new Date(d.date));
        const RawMaterial = data.map(d=>parseInt(d.RawMaterial));
        const Workmanship = data.map(d=>parseInt(d.Workmanship));
        const YearlyStorage = data.map(d=>parseInt(d.YearlyStorage)/12);

        plot2(x,RawMaterial,Workmanship,YearlyStorage,svg)
    })
    const width =700;
    const height =700;
    function plot2(X,Y1,Y2,Y3,container=svg,c=["red","green","blue"],lw='1px')
    {
        let dataSet = d3.map(X,function (d,i){
            return {x:d,
                y1:Y1[i],
                y2:Y2[i],
                y3:Y3[i]
            }
        })
        const xAx = d3.scaleTime()
            .domain(d3.extent(X))
            .range([40,width])

        const yAx = d3.scaleLinear()
            .domain(d3.extent([...Y1,...Y2,...Y3])) // you can calculate min max using min max as well.
            .range([height, 0]);
        let line = d3.line().curve(d3.curveBasis)
            .x(d=>{
                return xAx(d.x)})

        container.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAx))
        container.append("g")
            .attr("transform", "translate(40,0)")
            .call(d3.axisLeft(yAx))

        // Add X axis label:
        container.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + 30)
            .text("Month");

        // Y axis label:
        container.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", 70)
            .attr("x", 0)
            .text("Cost in USD")

/* const lineAvg = svg.append('g')
            .attr("class","TempAvg");
        lineAvg
            .selectAll('lines')
            .data([data])
            .enter()
            .append("path")
            .attr("d",d=>LineGen_avg(d))
*/


        // rawMaterial
        line.y(d=> {
                return yAx(d.y1)
            });
        raw_line = container.append("path")
            .attr("class", "rawM")

            .data([dataSet])
            .attr("d",line)
            .attr("fill",'none')
            .style("stroke",c[0])
            .style("stroke-width",lw.toString()+"px")

        // Workmanship
        line.y(d=> {
            return yAx(d.y2)
        });
        container.append("path")
            .data([dataSet])
            .attr("d",line)
            .attr("fill",'none')
            .style("stroke",c[1])
            .style("stroke-width",lw.toString()+"px")

        // YearlyStorage
        line.y(d=> {
            return yAx(d.y3)
        });
        container.append("path")
            .data([dataSet])
            .attr("d",line)
            .attr("fill",'none')
            .style("stroke",c[2])
            .style("stroke-width",lw.toString()+"px")

        // legend

        const legend = container.append('g')
            .attr("class","legend")
            .attr("transform","translate(-50,50)")
            .selectAll()
            .data([{name:"Raw Material",class:"rawMat"},
                {name:"Workmanship",class:"workM"},
                {name:"Yearly Storage",class:"yrlyS"}])
            .enter()
            .append("g")
            .attr("class",d=>d.class)
            .attr("transform",(d,i)=>{
                return `translate(${width/1.3},${i*20})`
            })

        legend.append("rect")
            .attr('width',"10px")
            .attr('height',"10px")
        legend.append("text")
            .text(d=>d.name)
            .attr("dx","20px")
            .attr("dy","10px")
            
    }