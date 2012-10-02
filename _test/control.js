/* Generated by GoScript <github.com/kless/GoScript> */



function testIf() {
	var x = 5;
	var code = "";


	if (x > 10) {
		code = "Error";
	} else {
		code = "OK";
	}
	document.write("[" + code + "] simple<br>");


	var x = 12; if (x > 10) {
		code = "OK";
	} else {
		code = "Error";
	}
	document.write("[" + code + "] with statement<br>");


	var i = 7;

	if (i === 3) {
		code = "Error";
	} else if (i < 3) {
		code = "Error";
	} else {
		code = "OK";
	}
	document.write("[" + code + "] multiple<br>");
}

function testSwitch() {
	var i = 10;
	var code = "";


	switch (i) {
	default:
		code = "Error"; break;
	case 1:
		code = "Error"; break;
	case 2: case 3: case 4:
		code = "Error"; break;
	case 10:
		code = "OK";
	}
	document.write("[" + code + "] simple<br>");


	i = 5; switch (true) {
	case i < 10:
		code = "OK"; break;
	case i > 10: case i < 0:
		code = "Error"; break;
	case i === 10:
		code = "Error"; break;
	default:
		code = "Error";
	}
	document.write("[" + code + "] with statement<br>");

	switch (true) {
	case i === 5:
		code = "OK";
	}
	document.write("[" + code + "] without expression<br>");


	switch (i) {
	case 4:
		code = "Error";
		
	case 5:
		code = "Error";
		
	case 6:
		code = "Error";
		
	case 7:
		code = "OK"; break;
	case 8:
		code = "Error"; break;
	default:
		code = "Error";
	}
	document.write("[" + code + "] with fallthrough<br>");
}

function testFor() {
	var sum = 0;


	for (var i = 0; i < 10; i++) {
		sum += i;
	}

	var code = "";
	if (sum === 45) {
		code = "OK";
	} else {
		code = "Error";
	}
	document.write("[" + code + "] simple<br>");



	sum = 1;
	for (; sum < 1000;) {
		sum += sum;
	}

	if (sum === 1024) {
		code = "OK";
	} else {
		code = "Error";
	}
	document.write("[" + code + "] 2 expressions omitted<br>");



	sum = 1;
	for (; sum < 1000;) {
		sum += sum;
	}

	if (sum === 1024) {
		code = "OK";
	} else {
		code = "Error";
	}
	document.write("[" + code + "] 2 expressions omitted, no semicolons<br>");



	var i = 0;
	var s = "";
	for (;;) {
		i++;
		if (i === 3) {
			s = "" + i + "";
			break;
		}
	}

	if (s === "3") {
		code = "OK";
	} else {
		code = "Error";
	}
	document.write("[" + code + "] infinite loop<br>");



	s = "";
	for (var i = 10; i > 0; i--) {
		if (i < 5) {
			break;
		}
		s += "" + i + " ";
	}

	if (s === "10 9 8 7 6 5 ") {
		document.write("[OK] break<br>");
	} else {
		document.write("[Error] value in break: " + s + "<br>");
	}



	s = "";
	for (var i = 10; i > 0; i--) {
		if (i === 5) {
			continue;
		}
		s += "" + i + " ";
	}

	if (s === "10 9 8 7 6 4 3 2 1 ") {
		document.write("[OK] continue<br>");
	} else {
		document.write("[Error] value in continue: " + s + "<br>");
	}

}

function testRange() {
	var hasError = false;
	var s = g.NewSlice([2, 3, 5]);

	var resultOk = new g.Map({
		0: 2,
		1: 3,
		2: 5
	}, 0);

	var v; for (var i in s.f) { v = s.f[i];
		if (JSON.stringify(resultOk.get(i)[0]) !== JSON.stringify(v)) {
			hasError = true;
			document.write("[Error] value in continue: " + s.f + "<br>");
		}

		document.write("key: " + i + " " + "value: " + v + "<br>");
	}

	if (!hasError) {
		document.write("[OK]<br>");
	}
}

function main() {
	document.write("<br>== testIf<br>");
	testIf();
	document.write("<br>== testSwitch<br>");
	testSwitch();
	document.write("<br>== testFor<br>");
	testFor();
	document.write("<br>== testRange<br>");
	testRange();
} main();
