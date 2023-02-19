
let table =
[ 
	["date","EstimatedCost","RawMaterial","Workmanship","YearlyStorage"],
	["1/1/2019",1094,211,386,260],
	["2/1/2019",2850,523,199,80],
	["3/1/2019",2168,580,236,65],
	["4/1/2019",1370,368,559,463],
	["5/1/2019",2429,550,291,27],
	["6/1/2019",1644,143,395,110],
	["7/1/2019",1641,640,497,108],
	["8/1/2019",2340,673,472,277],
	["9/1/2019",2327,90,31,50],
	["10/1/2019",1486,398,528,344],
	["11/1/2019",383,21,48,354],
	["12/1/2019",451,416,441,187],
	["1/1/2020",900,514,60,181],
	["2/1/2020",1653,201,558,36],
	["3/1/2020",1070,271,32,320],
	["4/1/2020",443,452,149,455],
	["5/1/2020",2473,344,223,452],
	["6/1/2020",1453,478,17,181],
	["7/1/2020",1659,599,276,45],
	["8/1/2020",761,673,392,108],
	["9/1/2020",930,469,43,67]
]

const domTable = document.getElementById("resultTable")		
//Took the idea of adding data to table from here: https://stackoverflow.com/questions/52919972/how-can-i-populate-a-table-with-javascript
//Took that beautiful beautiful table format from here: https://www.w3schools.com/html/html_table_padding_spacing.asp


for(i=1; i<table.length; i++) //skips the header
{
	console.log(table[i][0])
	tempActualCost = table[i][2]+table[i][3]+table[i][4]/12;
	tempSoldPrice = table[i][1]*1.1
	tempMargOfProfit = (tempSoldPrice-tempActualCost)/tempSoldPrice
	console.log("PROFIT="+tempMargOfProfit+", COST="+tempActualCost+", REV="+tempSoldPrice)

	table[i][5] =  (Math.round(tempActualCost * 100) / 100).toFixed(2)
	table[i][6] =  (Math.round(tempSoldPrice * 100) / 100).toFixed(2)
	table[i][7] =  (Math.round(tempMargOfProfit * 100) / 100).toFixed(2)

	let row = domTable.insertRow();

	for(j=0;j<8;j++)
	{
		let tempCell = row.insertCell(j) 
		tempCell.innerHTML = table[i][j]
	}

}


//let csvContent = "data:text/csv;charset=utf-8," 
//    + table.map(e => e.join(",")).join("\n");

//var encodedUri = encodeURI(csvContent);
//window.open(encodedUri);

//// https://d3js.org v6.2.0 Copyright 2020 Mike Bostock



/*
console.log(table[0][1])
console.log(table[0][1])
console.log(table[0][2])
console.log(table[0][3])
console.log(table[1][1])
console.log(table[3][2])
console.log(table[0])
console.log(table)










*/