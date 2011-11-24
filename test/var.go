package test

var a int
var b, c, d float64
var e = 0
var f, g float32 = -1, -2
var (
	h        int
	i, j, k = 2.0, 3.0, "bar"
)

var l = true   // l has type bool
var m = 0      // m has type int
var n = 3.0    // n has type float64
var o = "OMDB" // o has type string

//var A, B = complexSqrt(-1)
//var _, found = entries[name] // map lookup; only interested in "found"

// Array
var (
	a1 = new([32]byte)
	a2 = new([2][4]uint)
	//a3 = [2*N] struct { x, y int32 }
	a4 = [1000]*float64{}
	a5 = [4]byte{}
	a6 = [3][5]int{}
	a7 = [2][2][2]float64{} // same as [2]([2]([2]float64))

	b1 = [32]byte{1, 2, 3, 4}
)

// Slice
var (
	s1 = make([]int, 10)
	s2 = make([]int, 10, 20)
)

func main() {
	// === Short variable declarations
	a, b := 0, 10
	f := func() int { return 7 }
	ch := make(chan int)
	fa, fb := os.Pipe(fd) // os.Pipe() returns two values
	_, fc, _ := coord(p)  // coord() returns three values; only interested in y coordinate

	fd, fe := nextField(str, 0)
	ff, fg := nextField(str, offset) // redeclares offset
}
