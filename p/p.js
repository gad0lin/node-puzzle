// invoke node p.js "[10,20,4,10]"  100 
var bestMoves = {};
var transactionCost = 1;
function find_best(prices, start) {

	/*  if (start == prices.length) {
	    return 1000000000000;
	    }*/
	if (start == prices.length -1) {
		return {gain: 0, moves: []}
	}
	if (start in bestMoves) {
		return JSON.parse(JSON.stringify(bestMoves[start]));
	}
	var allMoves = [];
	for (var i = 1; i < prices.length - start; i++) {  
		var gain = - prices[start] + prices[start + i] - transactionCost;
		var best = find_best(prices, start + i);
		best.moves = [[start, start + i],...best.moves];
		best.gain += gain;
		allMoves.push(best);

	}
	if (start < prices.length - 1) {
                var skipped = find_best(prices, start+1);
		allMoves.push(skipped)
	}
	var best = allMoves[0];

	for (var i = 0; i< allMoves.length; i++) {
		if (best.gain < allMoves[i].gain) {
			best = allMoves[i]
		}
	}
	bestMoves[start] = best;
//	console.log("BEST MOVES " + JSON.stringify(bestMoves));
	return JSON.parse(JSON.stringify(best));
}

function fb(arr) {
	bestMoves={};
	find_best(arr,0);
	console.log("Input arr:" + JSON.stringify(arr));
//	console.log(JSON.stringify(bestMoves));
        console.log("Transaction cost " + transactionCost);
        console.log("Best gain " + JSON.stringify(bestMoves[0]));
}
var myArgs =  process.argv.slice(2); 

var prices = myArgs[0]

transactionCost = myArgs[1] || 1;
console.log(process.argv[3]);
//transactionCost = process.argv[4]
// fb([10,20, 5, 100]);
fb(JSON.parse(prices));
