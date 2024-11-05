// csjt0ehr01qvrnd73nmgcsjt0ehr01qvrnd73nn0 API KEY

let stockSymbol = document.getElementById("symbol-input");
let submitButton = document.getElementById("submit-button");
let stockInfo=document.getElementById("stockInfo");
//function goes once user clicks submit
submitButton.addEventListener("click", function() {
  let symbol = stockSymbol.value; // Get the value from the input field
  stockSymbol.value=''; //clears submission box
  getStockData(symbol); //function to have data
  });


//gets the stock data with a symbol
async function getStockData(symbol)
{
  const apiKey = "csjt0ehr01qvrnd73nmgcsjt0ehr01qvrnd73nn0";
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  console.log(`Fetching data for: ${symbol}`);

  //try catch for errors -----------------------------
  
  //c: Current price
  //h: High price of the day
  //l: Low price of the day
  //o: Open price of the day
  //pc: Previous close price

  try
  {
    const response=await fetch(url);
    const data = await response.json();
    let display = "Current price: " + data.c + 
      "\n \n High price of the day: " + data.h + 
      "\n \n Low price of the day: " + data.l + 
      "\n \n Open price of the day: " + data.o + 
      "\n \n Previous close price: " + data.pc;
    stockInfo.textContent=display;
  } catch (error)
  {
    console.log('Error fetching data:', error);
  }
  
}