/* Generated by GoScript <github.com/kless/GoScript> */

function min(x, y) {
	if (x < y) {
	return x;
}
	return y;
}

function testIf() {
	var x = 3, y = 5;
	var max = 7;

	if (x > max) {
	x = max;
}

	var z = 2; if (x < y) {
	return x;
} else if (x > z) {
	return z;
} else {
	return y;
}
}
