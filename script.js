// csjt0ehr01qvrnd73nmgcsjt0ehr01qvrnd73nn0 API KEY
let table=document.getElementById("stockTableBody");
let stockSymbol = document.getElementById("symbol-input");
let submitButton = document.getElementById("submit-button");
let stockInfo=document.getElementById("stockInfo");
let stockChart;


//code goes once user clicks submit
submitButton.addEventListener("click", function() {
  let symbol = (stockSymbol.value).toUpperCase(); // Get the value from the input field
  stockSymbol.value=''; //clears submission box
  displayStockData(symbol); //function to have data

  
  console.log(stockData(symbol)); //need to get this info before rest of code executes 
  
  });
  

//adds so if you press enter it also submits a stock/whatever u types 
stockSymbol.addEventListener("keydown",function(event)
{
   if(event.key=="Enter")  
   {
     submitButton.click();
   }
});
























//FUNCTIONS-----------------------------------------------------------------

//this function gets the stock data with a symbol and put it into a table it also adds a remove button for each row, highlights if its up or down and takes the symbol given by the user
async function displayStockData(symbol)
{
  const apiKey = "csjt0ehr01qvrnd73nmgcsjt0ehr01qvrnd73nn0";
  const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  console.log(`Fetching data for: ${symbol}`);

  //try catch for errors when stock is found -----------------------------

  //c: Current price
  //h: High price of the day
  //l: Low price of the day
  //o: Open price of the day
  //pc: Previous close price

  try
  {
    const response=await fetch(url);
    const data = await response.json();
    const responseProfile=await fetch(profileUrl);
    const profile = await responseProfile.json();

   
    let display = `
        Company Name: ${profile.name || "N/A"}
        \nCountry: ${profile.country || "N/A"}
        \nCurrency: ${profile.currency || "N/A"}
        \nExchange: ${profile.exchange || "N/A"}
        \nIndustry: ${profile.finnhubIndustry || "N/A"}
        \nIPO Date: ${profile.ipo || "N/A"}
        \nMarket Capitalization: ${profile.marketCapitalization || "N/A"}
        \nPhone: ${profile.phone || "N/A"}
        \nShare Outstanding: ${profile.shareOutstanding || "N/A"}
        \nTicker: ${profile.ticker || "N/A"}
        \nWebsite: ${profile.weburl || "N/A"}
        \nLogo URL: ${profile.logo || "N/A"}
      `;
    
    updateChart(data.pc,data.h,data.l,data.c); //call the chart function because the data is already loaded 

    if(data.c==0) //in case people enter invalid stuff 
      {
        display="Invalid Symbol Please Try Again";
        stockChart.destroy();
        return;
        
      }


    const removeCell=document.createElement("td");
    const removeButton=document.createElement("button");
    let row=document.createElement("tr"); //define values for the tables
    row.classList.add("fade-in");

    let change=data.pc-data.c;//calculate change to see if its up or down

    if(change<0) // if change is up stock is up
    {
      row.classList.add("activeUp");
    }
    else
    {
      row.classList.add("activeDown");
    }



    let dataArray=[symbol,data.c,data.h,data.l,data.o,data.pc];
    for(x=0;x<6;x++) //adds each value to the table 
      {



        // Append the row to the table
        table.appendChild(row);


        let cellData=document.createElement("td");
        cellData.textContent=dataArray[x];
        row.appendChild(cellData);
        table.appendChild(row);
      }

    removeButton.textContent="Remove";
    removeButton.onclick=function()
      {
        row.remove();
      }
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);


    //effect timer
    setTimeout(() => {
      row.classList.add("active");
    }, 10);

    stockInfo.textContent=display; //display stuff in that text box
  } catch (error)
  {
    stockInfo.textContent="Error Fetching data please try again"+error ;
  }

}






//add chart function takes data and displays a js chart---------------------
function updateChart(pc,h,l,c) {
  const chartElement = document.getElementById("stockChart");

  // Destroy the existing chart instance if it exists
  if (stockChart) {
    stockChart.destroy();
  }

  // Define x and y values
  let xValues = ["Previous Close", "High", "Low", "Current"]; // Labels for each price point
  let yValues = [pc,h,l,c]; // Stock price values

  // Create a new chart instance and assign it to stockChart
  stockChart = new Chart(chartElement, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,1)",
        borderWidth: 3,
        data: yValues
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          min: Math.min(...yValues) - 1,
          max: Math.max(...yValues) + 1,
        },
      },
    },
  });
}
//added chart-----------------------------------------------------------


async function stockData(symbol)
{
  const apiKey = "csjt0ehr01qvrnd73nmgcsjt0ehr01qvrnd73nn0";
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  console.log(`Fetching data for: ${symbol}`);

  //try catch for errors when stock is found -----------------------------

  //c: Current price
  //h: High price of the day
  //l: Low price of the day
  //o: Open price of the day
  //pc: Previous close price

  try
  {
    const response=await fetch(url);
    const data = await response.json();
    

    if(data.c==0) //in case people enter invalid stuff 
      {
        display="Invalid Symbol Please Try Again";
        
      }

    return {
      c: data.c,       // Current price
      h: data.h,          // High price of the day
      l: data.l,           // Low price of the day
      o: data.o,          // Open price of the day
      pc: data.pc // Previous close price
    };




   
  } catch (error)
  {
    stockInfo.textContent="Error Fetching data please try again"+error ;
  }

}

