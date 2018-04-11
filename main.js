"use strict";

// TODO:
// 0 Make upgrades
// 1 Make working ascension
// 2 Make working transcendsion
// 3 Think of more prestige names
// 4 Make invisible elements not take up space 

// setup();

// var upgradeDimListOfCostsStr = ['$2000', '$NaN', '$'+5e6, '$' + 10**1024];
// var upgradeDimListOfCostsInt = [2000, 0, 5e6, 10**1024];

var player = {
	'money': 0,
	'dim1': 0,
	'dim2': 1,
	'dim3': 1,
	// 'cursors': 0,
	'numberOfDims': 1,
	'totalMoney': 0,
	'ascensions': 0,
	'totalAscensions': 0
};

function setup() {
	// document.getElementById('moneyDisplay').innerHTML = 0;
	// document.getElementById('dimension1Display').innerHTML = 0;
	// createCanvas(0, 0)
	noCanvas();
	// createP('lol p')
}

function showMoney() {
		document.getElementById("moneyDisplay").innerHTML = '$' +
			Math.floor(player.money);
		// document.getElementById("moneyDisplay").innerHTML = 
			// Math.floor(player.money) + ' new Christians';
}

function dimUnlockedUpdate() {
	switch(player.numberOfDims) {
		case 1:
			
			document.getElementById('dim2DisplayParagraph').innerHTML = 'You need $2000 to unlock 2nd dimension';
			document.getElementById('dim2').innerHTML = 'Click to unlock 2nd dimension!';

			if (player.totalAscensions >= 1) {
				document.getElementById('dim3DisplayParagraph').style.display = 'block';
				document.getElementById('dim3').style.display = 'block';
				document.getElementById('dim3').innerHTML = 'Click to unlock 3rd dimension!';
				document.getElementById('dim3DisplayParagraph').innerHTML = 'You need $30000 to unlock 3rd dimension';
			} else {
				document.getElementById('dim3DisplayParagraph').style.display = 'none';
				document.getElementById('dim3').style.display = 'none';
			}

			// let elements = document.querySelectorAll(".my-class");
			// let i = titles.length;
			// while (i--) {
   		// titles[i].setAttribute("style", "cursor:pointer");
			// }
			break;

		case 2:
			document.getElementById('dim2DisplayParagraph').style.display = 'block';
			document.getElementById('dim2DisplayParagraph').innerHTML = 'You have <span id="dim2Display"></span> 2nd dimenions'; 
			document.getElementById('dim2').innerHTML = 'Click for 2nd dimension!';

			document.getElementById('dim3').style.display = 'block';
			document.getElementById('dim3DisplayParagraph').style.display = 'block';
			document.getElementById('dim3DisplayParagraph').innerHTML = 'You need $30000 to unlock 3rd dimension';
			document.getElementById('dim3').innerHTML = 'Click to unlock 3rd dimension!';

			document.getElementById('dim2Display').innerHTML = player.dim2;

 			break;

 		case 3:
			document.getElementById('dim2DisplayParagraph').style.display = 'block';
			document.getElementById('dim2DisplayParagraph').innerHTML = 'You have <span id="dim2Display"></span> 2nd dimenions'; 
			document.getElementById('dim2').innerHTML = 'Click for 2nd dimension!';

			document.getElementById('dim3DisplayParagraph').style.display = 'block';
			document.getElementById('dim3DisplayParagraph').innerHTML = 'You have <span id="dim3Display"></span> 3rd dimensions';
			document.getElementById('dim3').innerHTML = 'Click for 3rd dimension!';

			document.getElementById('dim2Display').innerHTML = player.dim2;
			document.getElementById('dim3Display').innerHTML = player.dim3;

 			break;
	}
}

function cookieClick(n) {
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

window.setInterval(function(){
	cookieClick(player.dim1/20);
	localStorage.setItem("player",JSON.stringify(player)); // save game
	// console.log(JSON.parse(localStorage.getItem("player")));
	// dimUnlockedUpdate();
	// updateSave()
}, 50);

// function updateSave() {

	// for (i = 0; i < save.length; i++) {
	// 	// TODO; update the save using for loop
	// }
// };

function load(){
	var savegame = JSON.parse(localStorage.getItem("player"));
	// console.log(savegame)
	player.money = savegame.money;
	player.totalMoney = savegame.totalMoney;
	player.dim1 = savegame.dim1;
	player.dim2 = savegame.dim2;
	player.dim3 = savegame.dim3;
	player.numberOfDims = savegame.numberOfDims;

	showMoney();
	document.getElementById('dim1Display').innerHTML = player.dim1;
	document.getElementById('dim2Display').innerHTML = player.dim2;
	document.getElementById('dim3Display').innerHTML = player.dim3;
	dimUnlockedUpdate();

	document.getElementById('dimsTab').click()
	// Object.keys(player).forEach(function(key, index, theArr, player){
		// if (typeof theArr[index] !== "undefined") 
		// theArr[key] = savegame.money;
		// key = 0;	
	// });
}

load();

function wipeSave(){
	localStorage.removeItem("player");

	player.money = 0;
	player.totalMoney = 0;
	getDim1('0');
	// getDim2('1');
	// getDim3('1');
	player.dim2 = 0;
	player.dim3 = 0;
	player.numberOfDims = 1;
	dimUnlockedUpdate();
	// player = _.mapValues(player, () => 0);
}

function getDim1(n) {
	if (n==='0') {
		player.dim1 = 0;
	} else {
		player.dim1 += n;
	}

	// dimUnlockedUpdate()
	document.getElementById('dim1Display').innerHTML = player.dim1;
}

function getDim2(n) {
	if (n==='1') {
		player.dim2 = 1;
	} else {
		player.dim2 += n;
	}

	// dimUnlockedUpdate()
	document.getElementById('dim2Display').innerHTML = player.dim2;
}

function getDim3(n) {
	if (n==='1') {
		player.dim3 = 1;
	} else {
		player.dim3 += n;
	}

	// dimUnlockedUpdate()
	document.getElementById('dim3Display').innerHTML = player.dim3;
}

function showSave() {
	let browser = whatBrowser();
	switch(browser){
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
	if(player.dim2!==0){
		getDim1(player.dim2);
	} else {
		getDim1(1);
	}
}

function clickedDim2() {
	if (!(player.numberOfDims < 2)) {
		if(player.dim3!==0) {
			getDim2(player.dim3);
		} else {
			getDim2(1);
		}
	} else {
		if (player.money >= 2e3) {
			console.log('got enough money');
			player.numberOfDims = 2;
			getDim1('0')
			dimUnlockedUpdate();
		} else {
			console.log('need more money')
		}
	}
}

function clickedDim3() {
	if (!(player.numberOfDims < 3)) {
		getDim3(1);
	} else {
		if (player.money >= 3e4) {
			console.log('got enough money')
			player.numberOfDims = 3;
			getDim1('0')
			dimUnlockedUpdate();
		} else {
			console.log('need more money')
		}
	}
}

function changeTab(evt, tab) {
	var tabcontent = document.getElementsByClassName('tabcontent');
	for(let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	document.getElementById(tab).style.display = 'block';
	// evt.currentTarget.className += " active";
}