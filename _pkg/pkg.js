/* Generated by GoScript <github.com/kless/GoScript> */















var g = {}; (function() {


function Export(pkg, exported) {
	var v; for (_ in exported) { v = exported[_];
		pkg.v = v;
	}
}





function S(f, cap) {
	this.f=f;
	this.cap=cap;
}







function M(f, zero) {
	this.f=f;
	this.zero=zero;
}




M.prototype.get = function(k) {
	var v = this.f;


	for (var i = 0; i < arguments.length; i++) {
		v = v[arguments[i]];
	}

	if (v === undefined) {
		return [this.zero, false];
	}
	return [v, true];
}

g.Export(g, [Export, S, M]);
})();
