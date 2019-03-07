# FOREX Arbitrage Opportunity Calculator
## Authors: Carter Alexander and Bryce Dias

This was out attempt at creating a FOREX arbitrage opportunity calculator in Javascript for the final project of our Software Engineering course. 

The main problem that we encountered was the presense of negative cycles found within the data. Since the margins within the data were so small, there was always a negative cycle to be found. This means that if the user were to indefinitely exchange currency between two different countries, they would be able to continually increase profits. This would result in our program running an infinie loop.