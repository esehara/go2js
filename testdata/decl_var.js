





var test = {}; (function() {

var A = "";
var a = 0;
var b = 0, c = 0, d = 0;
var e = 0;
var f = -1, g_ = -2;

var h = 0;
var i = 2.0, j = 3.0, k = "bar";


var l = true;
var m = 0;
var n = 3.0;
var o = "OMDB";



var a1 = g.MkArray([32], 0);
var a2 = g.MkArray([2,4], 0);

var a4 = g.MkArray([10], {p:undefined});
var a5 = g.MkArray([4], 0);
var a6 = g.MkArray([3,5], 0);
var a7 = g.MkArray([2,2,2], 0);

var a8 = g.MkArray([32], 0, [1, 2, 3, 4]);
var a9 = g.MkArray([4], 0, [1, {3:4}]);

var a10 = g.MkArray([3], "", ["a", "b", "c"]);




var s1 = g.MkSlice(0, 10);
var s2 = g.MkSlice(0, 10, 20);

var s3 = g.Slice(0, [2, 4, 6]);
var s4 = g.Slice(0, [1, {2:3}]);
var s5 = g.MkSlice(0, 0);




var m1 = g.Map(0, {});
var m2 = g.Map(0, {});
var m3 = g.Map("", {
	1: "first",
	2: "second",
	3: "third"
});
var m4 = g.Map(undefined, {
	1: "first",
	2: 2,
	3: 3
});

var found = m4.get(1)[1];




var p0 = {p:undefined};
var p1 = {p:undefined};
var p2 = {p:undefined};


function main() {
	var Fa = 0, Fb = 10;
	var Fc = "c";
	
	var Fd = 20;
	var Fe = 0;

} main();

g.Export(test, [A]);
})();
/* Generated by GoScript (github.com/kless/goscript) */
