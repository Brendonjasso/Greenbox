function strainer(strainTypeList, posList, medlist, negList, type, medNum, recNum) {
	var possibles = [];
	for (var i = 0, i < strainTypeList.length(); i++) {
		if (strainTypeList[0][i] === type) {
			possibles.push(strainTypeList[0][i]);
		}
	}

	var scalar = 0;
	if (medNum > recNum) {
		scalar = medNum/recNum;
		return sortAlgorithm(possibles, scalar, medList, negList);
	} else {
		scalar = recNum/medNum;
		return sortAlgorithm(possibles, scalar, posList, negList);
	}
}

function sorter(reccomends) {
	var sortedList = reccomends;
	for (int i = 0; i < reccomends.length(); i++) {
		for (int j = i; j < reccomends.length(); j++) {
			if (reccomends[1][i] > reccomends[1][j]) {
				var temp = reccomends[1][j];
				reccomends[1][j] = reccomends[1][i];
				reccomends[1][i] = temp;
			}	
		}
	}
	return sortedList;
}

function sortAlgorithm(possibles, scalar, effList, negList) {
	var reccomends = new Array(possibles.length()).fill(new Array(2));
	var posSum = 0;
	var negSum = 0;
	var score = 0;
	for (var i = 0; i < possibles.length(); i++) {
		for (var j = 0; j < effList.length(); j++) {
			posSum += scalar*effList[i][j];
		}
		for (var k = 0; k < negList.length(); k++) {
			negSum += scalar*negList[i][k];
		}
		score = posSum - negSum;
		reccomends[0][i].push(possibles[i]);
		reccomends[1][i].push(score);
		score = 0;
		posSum = 0;
		negSum = 0;
	}
	return sorter(reccomends);
}