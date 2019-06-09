"use strict";

// TODO:
// -1 Add offline progression - CURRENTLY WORKING ON
// 0 Make upgrades 
// 1 Make working ascension - DELAYED
// 2 Make working transcendsion - DELAYED
// 3 Think of more prestige names - DELAYED
// 4 Make invisible elements not take up space - DONE

// var upgradeDimListOfCostsStr = ['$2000', '$NaN', '$'+5e6, '$' + 10**1024];
// var upgradeDimListOfCostsInt = [2000, 0, 5e6, 10**1024];

// player object is for most values tied to the user
let player = {
	'money': 0,
	'dim1': 0,
	'dim2': 1,
	'dim3': 1,
	// 'cursors': 0,
	'numberOfDims': 1,
	'totalMoney': 0,
	'ascensions': 0,
	'totalAscensions': 0,
};

let currentTime = Date.now();
// let showCoords = false;

// doc object is for DOM elements which I need to get multiple times
let doc = {
	'dim2': document.getElementById('dim2'),
	'dim3': document.getElementById('dim3'),
	'dim1Display': document.getElementById('dim1Display'),
	'dim2Display': document.getElementById('dim2Display'),
	'dim3Display': document.getElementById('dim3Display'),
	'dim2DisplayPara': document.getElementById('dim2DisplayPara'),
	'dim3DisplayPara': document.getElementById('dim3DisplayPara'),
}

// If I decide to use p5 lib      
function setup() {
	// document.getElementById('moneyDisplay').innerHTML = 0;
	// document.getElementById('dimension1Display').innerHTML = 0;
	noCanvas();
}

function showMoney() {
	document.getElementById("moneyDisplay").innerHTML = '$' +
		Math.floor(player.money);
	// document.getElementById("moneyDisplay").innerHTML = 
	// Math.floor(player.money) + ' new Christians';
}

function dimUnlockedUpdate() {
	// this function is one of the most complicated functions in this js file
	// tldr: updates the dimensions's text (buildings is proper incremental games term).
	// eg. 'dim2 needs $<some amount of money>' then you unlock dim2 it states:
	// 'you have <# of dim2> second dimensions'
	switch (player.numberOfDims) {
		case 1: // if the user has one dimension unlocked (eg. it says that dim2 costs $2000)

			// doc object naming conventions is: (I was going to explain but just check html for id names)
			doc.dim2DisplayPara.innerHTML = 'You need $2000 to unlock 2nd dimension';
			doc.dim2.innerHTML = 'Click to unlock 2nd dimension!';

			if (player.totalAscensions >= 1) {
				// if the user ascends, the user can unlock dim3, even if they don't have dim2
				doc.dim3DisplayPara.style.display = 'block';
				doc.dim3.style.display = 'block';
				doc.dim3.innerHTML = 'Click to unlock 3rd dimension!';
				doc.dim3DisplayPara.innerHTML = 'You need $30000 to unlock 3rd dimension';
			} else {
				// if this is the users first ascension, then the user can't see dim3
				doc.dim3DisplayPara.style.display = 'none';
				dim3.style.display = 'none';
			}

			// let elements = document.querySelectorAll(".my-class");
			// let i = titles.length;
			// while (i--) {
			// titles[i].setAttribute("style", "cursor:pointer");
			// }
			break;

		case 2:
			doc.dim2DisplayPara.style.display = 'block';
			doc.dim2DisplayPara.innerHTML = 'You have <span id="dim2Display"></span> 2nd dimenions';
			doc.dim2Display = document.getElementById('dim2Display');
			// updates the element, so when the program updates dim2Display,
			// it changes the visible element
			doc.dim2.innerHTML = 'Click for 2nd dimension!';

			doc.dim3.style.display = 'block';
			doc.dim3DisplayPara.style.display = 'block';
			doc.dim3DisplayPara.innerHTML = 'You need $30000 to unlock 3rd dimension';
			doc.dim3.innerHTML = 'Click to unlock 3rd dimension!';

			doc.dim2Display.innerHTML = player.dim2;
			// doc.dim2Display.innerHTML = 'lol catz';

			break;

		case 3:
			doc.dim2DisplayPara.style.display = 'block';
			doc.dim2DisplayPara.innerHTML = 'You have <span id="dim2Display"></span> 2nd dimenions';
			doc.dim2Display = document.getElementById('dim2Display');
			doc.dim2.innerHTML = 'Click for 2nd dimension!';

			doc.dim3DisplayPara.style.display = 'block';
			doc.dim3DisplayPara.innerHTML = 'You have <span id="dim3Display"></span> 3rd dimensions';
			doc.dim3Display = document.getElementById('dim3Display');
			doc.dim3.innerHTML = 'Click for 3rd dimension!';

			doc.dim2Display.innerHTML = player.dim2;
			doc.dim3Display.innerHTML = player.dim3;

			break;
	}
}

function increaseMoney(n) {
	player.money += n;
	player.totalMoney += n;
	showMoney();
}

// function buyCursor(){
// let cursorCost = Math.floor(10 * Math.pow(1.1,player.	cursors - 1));
// if(player.money >= cursorCost){
// player.cursors++;
// player.money -= cursorCost;
// document.getElementById('cursors').innerHTML = player.cursors;
// showMoney();
// };
// let nextCost = Math.floor(10 * Math.pow(1.1,player.cursors));
// document.getElementById('cursorCost').innerHTML = nextCost;
// };

window.setInterval(function() { // main game loop, executes 20 times a second, every 50ms
	increaseMoney(player.dim1 / 20);

	// try-catch statement because the user could have blocked cookies and localStorage
	try {
		// TODO: execute this functionn on page exit
		localStorage.setItem("player", JSON.stringify(player)); // updates savegame in localStorage
		localStorage.setItem("timePlayerLeft", currentTime); // updates the time the player left
	} catch (err) {}; // save game
	currentTime = Date.now();

	// if (showCoords) {
	// 	// let elephant = window.event || e;
	// 	document.getElementById('mouseXDisplay').style.display = 'block';
	// 	document.getElementById('mouseYDisplay').style.display = 'block';
	// 	document.getElementById('mouseXDisplay').innerHTML = mouseX;
	// 	document.getElementById('mouseYDisplay').innerHTML = mouseY;
	// } else {
	// 	document.getElementById('mouseXDisplay').style.display = 'none';
	// 	document.getElementById('mouseYDisplay').style.display = 'none';
	// }

	// console.log(JSON.parse(localStorage.getItem("player")));
	// dimUnlockedUpdate();
	// updateSave()

	// google analytics
	// implemented using this guide: http://dhmstark.co.uk/articles/incrementals-part-2.html
	ga('send', 'event', 'My Game', 'Save');
}, 50);

// TODO; add offline progression
// function updateSave() {

// for (i = 0; i < save.length; i++) {
// 	// TODO; update the save using for loop
// }
// };

function load() {
	let numOfSecsAway;
	try {
		let savegame = JSON.parse(localStorage.getItem("player"));
		let timePlayerLeft = localStorage.getItem('timePlayerLeft');

		// TESTING OFFLINE PROGRESSION

		// console.log(timePlayerLeft + ' - time player left');
		// console.log(currentTime + ' - current time');
		// console.log(currentTime - timePlayerLeft + ' - difference player;
		// console.log((currentTime - timePlayerLeft) / 1000 + ' - difference between times in secs');
		numOfSecsAway = parseInt((currentTime - timePlayerLeft) / 1000);
		// console.log(test);

		if (savegame) player = savegame;

		// console.log(numOfSecsAway + ' - secsAway');
		// console.log(player.dim1 + ' - dim1');
		// console.log(player.dim1 * numOfSecsAway + ' - add this to money');
		player.money += player.dim1 * numOfSecsAway;
		offlineEarnings(player.dim1 * numOfSecsAway, numOfSecsAway);

		// 

	} catch (err) {};
	// try {
	// 	// console.log(savegame)
	// 	player.money = savegame.money;
	// 	player.totalMoney = savegame.totalMoney;
	// 	player.dim1 = savegame.dim1;
	// 	player.dim2 = savegame.dim2;
	// 	player.dim3 = savegame.dim3;
	// 	player.numberOfDims = savegame.numberOfDims;
	// } catch(err){};

	showMoney();
	doc.dim1Display.innerHTML = player.dim1;
	doc.dim2Display.innerHTML = player.dim2;
	doc.dim3Display.innerHTML = player.dim3;
	dimUnlockedUpdate();

	// document.getElementById('dimsTab').click()
	// Object.keys(player).forEach(function(key, index, theArr, player){
	// if (typeof theArr[index] !== "undefined") 
	// theArr[key] = savegame.money;
	// key = 0;	
	// });
}

function wipeSave() {
	player.money = 0;
	player.totalMoney = 0;
	getDim1('0');
	// getDim2('1');
	// getDim3('1');
	player.dim2 = 0;
	player.dim3 = 0;
	player.numberOfDims = 1;
	dimUnlockedUpdate();

	localStorage.removeItem("player");

	// player = _.mapValues(player, () => 0);
}

function getDim1(n) {
	if (n === '0') {
		player.dim1 = 0;
	} else {
		player.dim1 += n;
	}

	// dimUnlockedUpdate()
	doc.dim1Display.innerHTML = player.dim1;
}

function getDim2(n) {
	if (n === '1') {
		player.dim2 = 1;
	} else {
		player.dim2 += n;
	}

	// dimUnlockedUpdate()
	doc.dim2Display.innerHTML = player.dim2;
}

function getDim3(n) {
	if (n === '1') {
		player.dim3 = 1;
	} else {
		player.dim3 += n;
	}

	// dimUnlockedUpdate()
	doc.dim3Display.innerHTML = player.dim3;
}

function showSave() {
	let browser = whatBrowser();
	switch (browser) {
		case 'ioschrome':
		case 'googlechrome':
			document.getElementById('showSaveBtn').innerHTML = 'Copy \
				paste this into the console to load save:<br/>player = \
				' + JSON.stringify(player);
			break;
		case '!googlechrome':
			document.getElementById('showSaveBtn').innerHTML = 'Copy \
				paste this into the console to load save:<br/>player = \
				' + player.toSource().replace(/[()]/g, '');
			break;

	}
	// document.getElementById('showSaveBtn').innerHTML = 'Copy \
	// 	paste this into the console to load save:<br/>player = \
	// 	' + player.toSource().replace(/[()]/g, '');
}

function tryToAscend(n) {
	console.log(ascensionListOfCostsInt[player.ascensions] + ' cost')
	if (ascensionListOfCostsInt[player.ascensions] <= player.money) {
		player.ascensions += n;

		player.money = 0;
		getDimension1('0');
		getDimension2('1');
		getDimension3('1');

		dimUnlockedUpdate();
	}
}

function whatBrowser() {
	// please note, 
	// that IE11 now returns undefined again for window.chrome
	// and new Opera 30 outputs true for window.chrome
	// and new IE Edge outputs to true now for window.chrome
	// and if not iOS Chrome check
	// so use the below updated condition
	var isChromium = window.chrome,
		winNav = window.navigator,
		vendorName = winNav.vendor,
		isOpera = winNav.userAgent.indexOf("OPR") > -1,
		isIEedge = winNav.userAgent.indexOf("Edge") > -1,
		isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
		// is Google Chrome on IOS
		return 'ioschrome'
	} else if (
		isChromium !== null &&
		typeof isChromium !== "undefined" &&
		vendorName === "Google Inc." &&
		isOpera === false &&
		isIEedge === false
	) {
		// is Google Chrome
		return 'googlechrome'
	} else {
		// not Google Chrome 
		return '!googlechrome'
	}
}

function clickedDim1() {
	if (player.dim2 !== 0) {
		getDim1(player.dim2);
	} else {
		getDim1(1);
	}
}

function clickedDim2() {
	if (!(player.numberOfDims < 2)) {
		if (player.dim3 !== 0) {
			getDim2(player.dim3);
		} else {
			getDim2(1);
		}
	} else {
		if (player.money >= 2e3) {
			// console.log('got enough money');
			player.numberOfDims = 2;
			// getDim1('0')
			dimUnlockedUpdate();
		} else {
			// console.log('need more money')
		}
	}
}

function clickedDim3() {
	if (!(player.numberOfDims < 3)) {
		getDim3(1);
	} else {
		if (player.money >= 3e4) {
			// console.log('got enough money')
			player.numberOfDims = 3;
			// getDim1('0')
			dimUnlockedUpdate();
		} else {
			// console.log('need more money')
		}
	}
}

function changeTab(evt, tab) {
	let tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	document.getElementById(tab).style.display = 'block';
	// evt.currentTarget.className += " active"; 
}

// Below is attempt to stop zooming in when double tap

// function doubleTapZoom(bool) {
// 	let meta = document.getElementById('doubleTapZoomIn');
// 	if (bool) {
// 		meta.setAttribute('content', 'width=device-width, initi \
// 			al-scale=1.0, maximum-scale=1.0, user-scalable=0');
// 	} else {
// 		// meta.setAttribute('content', '');

// 	}
// }

function cheat() {
	player.money += 1e80;
}

function offlineEarnings(earnings, time_away) {
	if (time_away >= 2) {
		changeTab('event', 'offlineEarningsTab');
		// let formatted_time_away = (new Date()).clearTime().addSeconds(time_away).toString('H:mm:ss'); 
		document.getElementById('timeAwayDisplay').innerHTML = time_away + ' seconds';
		document.getElementById('amountEarnedDisplay').innerHTML = '$' + earnings;
	} else {
		document.getElementById('dimsTab').click();
	}
}

load();