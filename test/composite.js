/* Generated by GoJscript <github.com/kless/GoJscript> */




function person(name, age) {this.name=name; this.age=age;}





function Older(p1, p2) {
	if (p1.age > p2.age) {
		return [p1, p1.age - p2.age];
	}
	return [p2, p2.age - p1.age];
}

function main() {
	var tom = new person();

	tom.name = "Tom", tom.age = 18;


	var bob = new person(); bob.age = 25; bob.name = "Bob";
	var paul = new person("Paul", 43);

	var _ = Older(tom, bob), tb_Older = _[0], tb_diff = _[1];
	var _ = Older(tom, paul), tp_Older = _[0], tp_diff = _[1];
	var _ = Older(bob, paul), bp_Older = _[0], bp_diff = _[1];

	alert("Of " + tom.name + " and " + bob.name + ", " + tb_Older.name + " is older by " + tb_diff + " years\n");


	alert("Of " + tom.name + " and " + paul.name + ", " + tp_Older.name + " is older by " + tp_diff + " years\n");


	alert("Of " + bob.name + " and " + paul.name + ", " + bp_Older.name + " is older by " + bp_diff + " years\n");

}
