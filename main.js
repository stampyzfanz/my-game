"use strict";

// TODO:
// 1 Make upgrades 
// 2 Make working ascension
// 3 Consider using bootstrap or something

// Acronym list:
// Dim => dimension
// DisplayP => DisplayPgraph

// player object is for most values tied to the user
let player = {
	'money': 0,
	'dim1': 0,
	'dim2': 1,
	'dim3': 1,
	'dimNum': 1,
	'totalMoney': 0,
	'ascensions': 0,
	'totalAscensions': 0,
};

let currentTime = Date.now();

const defaults = Object.assign({}, player);
const dimensionCost = [0, 2e3, 3e4];

let showCoords = false;

// doc object is for DOM elements which I need to get multiple times
// doc object naming conventions is: 
// dim1 is the button where you click
// dim1DisplayP is the paragraph saying how many dims the player has
const doc = {
	'money': document.getElementById('moneyDisplay'),
	'dim2': document.getElementById('dim2'),
	'dim3': document.getElementById('dim3'),
	'dim1Display': document.getElementById('dim1Display'),
	'dim2Display': document.getElementById('dim2Display'),
	'dim3Display': document.getElementById('dim3Display'),
	'dim2DisplayP': document.getElementById('dim2DisplayP'),
	'dim3DisplayP': document.getElementById('dim3DisplayP'),
	'console': document.getElementById('realconsole'),
}

// p5 library boilerplate
function setup() {
	noCanvas();
}

function dimUnlockedUpdate() {
	// this function is one of the most complicated functions
	// Update the dimensions's text (aka buildings).
	// eg. 'dim2 needs $<some amount of money>' then you unlock dim2 it states:
	// 'you have <# of dim2> second dimensions'

	function showDim(dimIndex, isUnlocked) {
		let dimKey = 'dim' + dimIndex;
		let dimDisplayPKey = dimKey + 'DisplayP';
		let price = '$' + dimensionCost[dimIndex - 1];
		let ordinal = getOrdinal(dimIndex);

		doc[dimDisplayPKey].style.display = 'block';
		doc[dimKey].style.display = 'block';

		if (isUnlocked == "unlocked") {
			let display = dimKey + 'Display';

			doc[dimDisplayPKey].innerHTML =
				'You have <span id="' + display + '"></span> 2nd dimenions';
			doc[display] = document.getElementById(display);
			// updates the element, so when the program recreates dim2Display,
			// it changes the visible element
			// the old reference gets overridden
			doc[dimKey].innerHTML = 'Click for 2nd dimension!';
			doc[display].innerHTML = player[dimKey];
		} else {
			doc[dimDisplayPKey].innerHTML =
				'You need ' + price + ' to unlock ' + ordinal + ' dimension';
			doc[dimKey].innerHTML =
				'Click to unlock ' + ordinal + ' dimension!';
		}
	}

	function hideDim(dimIndex) {
		let dimKey = 'dim' + dimIndex;
		let dimDisplayPKey = dimKey + 'DisplayP';
		doc[dimDisplayPKey].style.display = 'none';
		doc[dimKey].style.display = 'none';
	}

	switch (player.dimNum) {
		case 1:
			showDim(2, "locked");

			// ASCENSION CODE
			if (player.totalAscensions >= 1) {
				// if the user ascends, the user can unlock dim3, even if they don't have dim2
				showDim(3, "locked");
			} else {
				// if this is the users first ascension, then the user can't see dim3
				hideDim(3);
			}
			break;
		case 2:
			showDim(2, "unlocked");
			showDim(3, "locked");
			break;
		case 3:
			showDim(2, "unlocked");
			showDim(3, "unlocked");
			break;
	}
}

function increaseMoney(n) {
	player.money += n;
	player.totalMoney += n;
	doc.money.innerHTML = '$' + Math.floor(player.money);
}

window.setInterval(function() { // main game loop, executes 20 times a second, every 50ms
	increaseMoney(player.dim1 / 20);

	// try-catch statement because the user could have blocked cookies and localStorage
	try {
		// updates savegame in localStorage
		localStorage.setItem("player", JSON.stringify(player));
		// updates the time the player left
		localStorage.setItem("timePlayerLeft", currentTime);
	} catch (err) {}; // save game
	currentTime = Date.now(); // unix value

	if (showCoords) {
		// let elephant = window.event || e;
		document.getElementById('mouseXDisplay').style.display = 'block';
		document.getElementById('mouseYDisplay').style.display = 'block';
		document.getElementById('mouseXDisplay').innerHTML = winMouseX;
		document.getElementById('mouseYDisplay').innerHTML = winMouseY;
	} else {
		document.getElementById('mouseXDisplay').style.display = 'none';
		document.getElementById('mouseYDisplay').style.display = 'none';
	}
	// console.log(JSON.parse(localStorage.getItem("player")));
	// dimUnlockedUpdate();
	// updateSave()

	// google analytics
	// implemented using this guide: http://dhmstark.co.uk/articles/incrementals-part-2.html
	ga('send', 'event', 'My Game', 'Save');
}, 50);

function load() {
	let numSecsAway;
	try {
		let savegame = JSON.parse(localStorage.getItem("player"));
		let timePlayerLeft = localStorage.getItem('timePlayerLeft');
		if (timePlayerLeft !== null) {
			// if its not first time playing
			numSecsAway = parseInt((currentTime - timePlayerLeft) / 1000);

			if (savegame) player = savegame;

			player.money += player.dim1 * numSecsAway;
			offlineEarnings(player.dim1 * numSecsAway, numSecsAway);
		} else {
			document.getElementById('dimsTab').click();
		}
	} catch (err) {
		// console that talks to user in top right of screen
		changeConsole('Please enable cookies');
		console.log(err);
	};


	doc.money.innerHTML = '$' + Math.floor(player.money);
	doc.dim1Display.innerHTML = player.dim1;
	doc.dim2Display.innerHTML = player.dim2;
	doc.dim3Display.innerHTML = player.dim3;
	dimUnlockedUpdate();

	changeConsole();
}


function offlineEarnings(earnings, time_away) {
	if (time_away >= 2) {
		console.log(time_away);

		changeTab('event', 'offlineEarningsTab');

		let formatted_time_away =
			(new Date(time_away * 1000))
			.toUTCString()
			.match(/(\d\d:\d\d:\d\d)/)[0];
		// copy pasta ^


		document.getElementById('timeAwayDisplay')
			// .innerHTML = time_away + ' seconds';
			.innerHTML = formatted_time_away;
		document.getElementById('amountEarnedDisplay')
			.innerHTML = '$' + earnings;
	} else {
		document.getElementById('dimsTab').click();
	}
}

function wipeSave() {
	player = Object.create(defaults);
	localStorage.removeItem("player");
	dimUnlockedUpdate();
}

function addDim(dimIndex, n) {
	const dimKey = 'dim' + dimIndex;
	player[dimKey] += n;
	doc[dimKey + 'Display'].innerHTML = player[dimKey];
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
}

// ASCENSION CODE
// function tryToAscend(n) {
// 	console.log(ascensionListOfCostsInt[player.ascensions] + ' cost')
// 	if (ascensionListOfCostsInt[player.ascensions] <= player.money) {
// 		player.ascensions += n;
// 		player = Object.create(defaults)
// 		dimUnlockedUpdate();
// 	}
// }

function clickedDim(dimIndex) {
	// stops player clicking dim3 when they have only just started playing 
	if (dimIndex < player.dimNum) {
		let dimKey = 'dim' + (dimIndex + 1);
		addDim(dimIndex, player[dimKey]);
		// eg player.dim1 += player.dim2

	} else if (dimIndex == player.dimNum) {

		addDim(dimIndex, 1);
		// increase by 1 if player hasn't unlocked higher up dims

	} else if (dimIndex > player.dimNum) {

		// try to buy dimension
		// if it has money

		if (player.money >= dimensionCost[dimIndex - 1]) {
			player.dimNum++;
		} else {
			// TODO: Tell user that they need more money
			changeConsole('You need $' + dimensionCost[dimIndex - 1] +
				' to buy the ' +
				getOrdinal(dimIndex) + ' dimension');
		}
	} else {
		changeConsole('I dunno. Its a bug if you see this');
		// TODO: Tell user that they can only unlock the dim before what they clicked
	}
	dimUnlockedUpdate();
}

function changeTab(evt, tab) {
	let tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	document.getElementById(tab).style.display = 'block';
	// evt.currentTarget.className += " active"; 
}

function changeConsole(text) {
	// can talk to user
	if (typeof text == 'string') {
		doc.console.innerHTML = text;
	}

	if (doc.console.innerHTML == '') {
		doc.console.style.display = 'none';
	} else {
		doc.console.style.display = 'block';
	}
}

function cheat() {
	player.money += 1e80;
}

load();