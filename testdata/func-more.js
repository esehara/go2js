/* Generated by GoScript (github.com/kless/goscript) */










function person(name, age) {
	this.name=name;
	this.age=age
}



function Older(people) {
	if (people.length === 0) {
		return [false, new person()];
	}
	var older = people[0];

	var value; for (var _ in people) { value = people[_];

		if (value.age > older.age) {
			older = value;
		}
	}
	return [true, older];
}

function main() {


	
	var ok = false;
	var older = new person("", 0);



	var paul = new person("Paul", 23);
	var jim = new person("Jim", 24);
	var sam = new person("Sam", 84);
	var rob = new person("Rob", 54);
	var karl = new person("Karl", 19);


	older = Older(paul, jim)[1];
	document.write("The older of Paul and Jim is:  " + older.name + "<br>");

	older = Older(paul, jim, sam)[1];
	document.write("The older of Paul, Jim and Sam is:  " + older.name + "<br>");

	older = Older(paul, jim, sam, rob)[1];
	document.write("The older of Paul, Jim, Sam and Rob is:  " + older.name + "<br>");

	older = Older(karl)[1];
	document.write("When Karl is alone in a group, the older is:  " + older.name + "<br>");

	_ = Older(), ok = _[0], older = _[1];
	if (!ok) {
		document.write("In an empty group there is no older person<br>");
	}
} main();
