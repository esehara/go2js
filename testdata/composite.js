/* Generated by GoScript (github.com/kless/goscript) */










function person(name, age) {
	this.name=name;
	this.age=age
}


function Older(p1, p2) {
	if (p1.age > p2.age) {
		return [p1, p1.age - p2.age];
	}
	return [p2, p2.age - p1.age];
}

function testStruct() {
	var tom = new person("", 0);

	tom.name = "Tom", tom.age = 18;


	var bob = new person(); bob.age = 25, bob.name = "Bob";
	var paul = new person("Paul", 43);

	var _ = Older(tom, bob), tb_Older = _[0], tb_diff = _[1];

	if (JSON.stringify(tb_Older) === JSON.stringify(bob) && tb_diff === 7) {
		document.write("[OK] Tom, Bob<br>");
	} else {
		document.write("[Error] Of " + tom.name + " and " + bob.name + ", " + tb_Older.name + " is older by " + tb_diff + " years<br>");

	}


	var _ = Older(tom, paul), tp_Older = _[0], tp_diff = _[1];

	if (JSON.stringify(tp_Older) === JSON.stringify(paul) && tp_diff === 25) {
		document.write("[OK] Tom, Paul<br>");
	} else {
		document.write("[Error] Of " + tom.name + " and " + paul.name + ", " + tp_Older.name + " is older by " + tp_diff + " years<br>");

	}


	var _ = Older(bob, paul), bp_Older = _[0], bp_diff = _[1];

	if (JSON.stringify(bp_Older) === JSON.stringify(paul) && bp_diff === 18) {
		document.write("[OK] Bob, Paul<br>");
	} else {
		document.write("[Error] Of " + bob.name + " and " + paul.name + ", " + bp_Older.name + " is older by " + bp_diff + " years<br>");

	}
}




function Older10(people) {
	var older = people[0];


	for (var index = 1; index < 10; index++) {
		if (people[index].age > older.age) {
			older = people[index];
		}
	}
	return older;
}

function testArray() {

	var array = g.MkArray([10], new person("", 0));



	array[1] = new person("Paul", 23);
	array[2] = new person("Jim", 24);
	array[3] = new person("Sam", 84);
	array[4] = new person("Rob", 54);
	array[8] = new person("Karl", 19);

	var older = Older10(array);


	if (older.name === "Sam") {
		document.write("[OK]<br>");
	} else {
		document.write("[Error] The older of the group is: " + older.name + "<br>");
	}
}



function initializeArray() {

	var array1 = g.MkArray([10], new person("", 0), [
		new person("", 0),
		new person("Paul", 23),
		new person("Jim", 24),
		new person("Sam", 84),
		new person("Rob", 54),
		new person("", 0),
		new person("", 0),
		new person("", 0),
		new person("Karl", 10),
		new person("", 0)
	]);


	var array2 = g.MkArray([10], new person("", 0), [
		new person("", 0),
		new person("Paul", 23),
		new person("Jim", 24),
		new person("Sam", 84),
		new person("Rob", 54),
		new person("", 0),
		new person("", 0),
		new person("", 0),
		new person("Karl", 10),
		new person("", 0)]);


	if (array1.length === array2.length) {
		document.write("[OK] length<br>");
	} else {
		document.write("[Error] len => array1: " + array1.length + ", array2: " + array2.length + "<br>");
	}

	if (JSON.stringify(array1) === JSON.stringify(array2)) {
		document.write("[OK] comparison<br>");
	} else {
		document.write("[Error] array1: " + array1 + "<br>array2: " + array2 + "<br>");
	}
}



function multiArray() {

	var doubleArray_1 = g.MkArray([2,4], 0, [[1, 2, 3, 4], [5, 6, 7, 8]]);


	var doubleArray_2 = g.MkArray([2,4], 0, [
		[1, 2, 3, 4], [5, 6, 7, 8]]);


	var doubleArray_3 = g.MkArray([2,4], 0, [
		[1, 2, 3, 4],
		[5, 6, 7, 8]
	]);


	if (JSON.stringify(doubleArray_1) === JSON.stringify(doubleArray_2) && JSON.stringify(doubleArray_2) === JSON.stringify(doubleArray_3)) {
		document.write("[OK]<br>");
	} else {
		document.write("[Error] multi-dimensional<br>");
	}
}



function main() {
	document.write("<br>== testStruct<br>");
	testStruct();
	document.write("<br>== testArray<br>");
	testArray();
	document.write("<br>== initializeArray<br>");
	initializeArray();
	document.write("<br>== multiArray<br>");
	multiArray();
} main();
