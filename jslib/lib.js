/* Generated by GoScript (github.com/kless/goscript) */







var g = {}; (function() {


const 
invalid = 0,
arrayKind = 1,
mapKind = 2,
sliceKind = 3;





(function() {


	if (!Array.isArray) {
		Array.isArray = function(arg) {
			return Object.prototype.toString.call(arg) === "[object Array]";
		};
	}
}());







function arrayType(v, len_) {
	this.v=v;

	this.len_=len_
}


arrayType.prototype.len = function(dim) {
	if (dim === undefined) {
		return this.len_[0];
	}
	return this.len_[arguments.length];
}


arrayType.prototype.cap = function(dim) {
	if (dim === undefined) {
		return this.len_[0];
	}
	return this.len_[arguments.length];
}



function MkArray(dim, zero, elem) {
	var a = new arrayType([], g.Map(0));

	if (elem !== undefined) {
		if (!equalDim(dim, getDimArray(elem))) {
			a.v = initArray(dim, zero);
			mergeArray(a.v, elem);
		} else {
			a.v = elem;
		}
	} else {
		a.v = initArray(dim, zero);
	}

	var v; for (var i in dim) { v = dim[i];
		a.len_[i] = v;
	}



	return a;
}

arrayType.prototype.kind = function() { return arrayKind; }


function mergeArray(dst, src) {
	var srcVal; for (var i in src) { srcVal = src[i];
		if (Array.isArray(srcVal)) {
			mergeArray(dst[i], srcVal);
		} else {
			var isHashMap = false;


			if (typeof(srcVal) === "object") {
				var v; for (var k in srcVal) { v = srcVal[k];
					if (srcVal.hasOwnProperty(k)) {
						isHashMap = true;
						i = k;
						dst[i] = v;
					}
				}
			}
			if (!isHashMap) {
				dst[i] = srcVal;
			}
		}
	}
}



function equalDim(d1, d2) {
	if (d1.length !== d2.length) {
		return false;
	}
	var v; for (var i in d1) { v = d1[i];
		if (JSON.stringify(v) !== JSON.stringify(d2[i])) {
			return false;
		}
	}
	return true;
}



function getDimArray(a) { var dim = [];
	for (;;) {
		dim.push(a.length);

		if (Array.isArray(a[0])) {
			a = a[0];
		} else {
			break;
		}
	}
	return dim;
}


function initArray(dim, zero) { var a = [];
	if (dim.length === 0) {
		return zero;
	}
	var nextArray = initArray(dim.slice(1), zero);

	for (var i = 0; i < dim[0]; i++) {
		a[i] = nextArray;
	}
	return a;
}





















function sliceType(array, elem, low, high, len, cap, isNil) {
	this.array=array;
	this.elem=elem;

	this.low=low;
	this.high=high;
	this.len=len;
	this.cap=cap;

	this.isNil=isNil
}



function NilSlice() {
	var s = new sliceType(undefined, [], 0, 0, 0, 0, false);
	s.isNil = true;
	s.len = 0, s.cap = 0;
	return s;
}


function MkSlice(zero, len, cap) {
	var s = new sliceType(undefined, [], 0, 0, 0, 0, false);
	s.len = len;

	for (var i = 0; i < len; i++) {
		s.elem[i] = zero;
	}

	if (cap !== undefined) {
		s.cap = cap;
	} else {
		s.cap = len;
	}

	return s;
}


function Slice(zero, elem) {
	var s = new sliceType(undefined, [], 0, 0, 0, 0, false);

	if (arguments.length === 0) {
		s.isNil = true;
		return s;
	}

	var srcVal; for (var i in elem) { srcVal = elem[i];
		var isHashMap = false;


		if (typeof(srcVal) === "object") {
			var v; for (var k in srcVal) { v = srcVal[k];
				if (srcVal.hasOwnProperty(k)) {
					isHashMap = true;

					for (i; i < k; i++) {
						s.elem[i] = zero;
					}
					s.elem[i] = v;
				}
			}
		}
		if (!isHashMap) {
			s.elem[i] = srcVal;
		}
	}

	s.len = s.elem.length;
	s.cap = s.len;
	return s;
}


function SliceFrom(a, low, high) {
	var s = new sliceType(undefined, [], 0, 0, 0, 0, false);

	s.array = a;
	s.low = low;
	s.high = high;
	s.len = high - low;
	s.cap = a.cap - low;
	return s;
}


sliceType.prototype.set = function(i, low, high) {
	this.low = low, this.high = high;

	if (i.elem !== undefined) {
		this.elem = i.elem.slice(low, high);
		this.cap = i.cap - low;
		this.len = this.elem.length;

	} else {
		this.array = i;
		this.cap = i.length - low;
		this.len = high - low;
	}
}


sliceType.prototype.get = function() {
	if (this.elem.length !== 0) {
		return this.elem;
	}

	return this.array.slice(this.low, this.high);
}


sliceType.prototype.str = function() {
	var _s = this.get();
	return _s.join("");
}

sliceType.prototype.kind = function() { return sliceKind; }



































function mapType(v, zero) {
	this.v=v;
	this.zero=zero


}


function Map(zero, v) {
	var m = new mapType(v, zero);







	return m;
}




mapType.prototype.get = function(k) {
	var v = this.v;


	for (var i = 0; i < arguments.length; i++) {
		v = v[arguments[i]];
	}

	if (v === undefined) {
		return [this.zero, false];
	}
	return [v, true];
}


mapType.prototype.len = function() {
	var len = 0;
	var _; for (var key in this.v) { _ = this.v[key];
		if (this.v.hasOwnProperty(key)) {
			len++;
		}
	}
	return len;
}
















function Export(pkg, exported) {
	var v; for (var _ in exported) { v = exported[_];
		pkg.v = v;
	}
}

g.MkArray = MkArray;
g.NilSlice = NilSlice;
g.MkSlice = MkSlice;
g.Slice = Slice;
g.SliceFrom = SliceFrom;
g.Map = Map;
g.Export = Export;

})();
