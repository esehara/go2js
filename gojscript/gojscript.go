// Copyright 2011  The "GoJscript" Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package gojscript

import (
	"bytes"
	"errors"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	//"io/ioutil"
	"os"
	//"path"
	"strings"
)

const HEADER = "/* Generated by GoJscript <github.com/kless/GoJscript> */"

// To be able to minimize code
const (
	NL  = "{{NL}}" // new line
	SP  = "{{SP}}" // space
	TAB = "{{TAB}}"
)

// Represents the code transformed to JavaScript.
type transform struct {
	fset *token.FileSet
	line int // actual line

	public []string // declarations to be exported
	err    []error
	//pointers []string
	*bytes.Buffer // sintaxis translated to JS
	*dataStmt     // extra data for a statement
}

func newTransform() *transform {
	return &transform{
		token.NewFileSet(),
		0,
		make([]string, 0),
		nil,
		new(bytes.Buffer),
		&dataStmt{},
	}
}

// Returns the line number.
func (tr *transform) getLine(pos token.Pos) int {
	// -1 because it was inserted a line (the header)
	return tr.fset.Position(pos).Line - 1
}

// Appends new lines according to the position.
// Returns a boolean to indicate if have been added.
func (tr *transform) addLine(pos token.Pos) bool {
	var s string

	new := tr.getLine(pos)
	dif := new - tr.line

	if dif == 0 {
		return false
	}

	for i := 0; i < dif; i++ {
		s += NL
	}

	tr.WriteString(s)
	tr.line = new
	return true
}

// Appends an error.
func (tr *transform) addError(format string, a ...interface{}) {
	tr.err = append(tr.err, fmt.Errorf(format, a...))
}

// Appends public declaration names to be exported.
func (tr *transform) checkPublic(s string) {
	if ast.IsExported(s) {
		tr.public = append(tr.public, s)
	}
}

// * * *

// Compiles a Go source file into JavaScript.
// Writes the output in "filename" but with extension ".js".
func Compile(filename string) error {
	trans := newTransform()

	/* Parse several files
	parse.ParseFile(fset, "a.go", nil, 0)
	parse.ParseFile(fset, "b.go", nil, 0)
	*/

	// If Go sintaxis is incorrect then there will be an error.
	node, err := parser.ParseFile(trans.fset, filename, nil, 0) //parser.ParseComments)
	if err != nil {
		return err
	}

	trans.WriteString(HEADER)

	for _, decl := range node.Decls {
		switch decl.(type) {
		case *ast.FuncDecl:
			trans.getFunc(decl.(*ast.FuncDecl))

		// http://golang.org/pkg/go/ast/#GenDecl || godoc go/ast GenDecl
		//  Tok    token.Token   // IMPORT, CONST, TYPE, VAR
		//  Specs  []Spec
		case *ast.GenDecl:
			genDecl := decl.(*ast.GenDecl)

			switch genDecl.Tok {
			case token.IMPORT:
				trans.getImport(genDecl.Specs)
			case token.CONST:
				trans.getConst(genDecl.Specs)
			case token.TYPE:
				trans.getType(genDecl.Specs)
			case token.VAR:
				trans.getVar(genDecl.Specs)
			}

		default:
			panic(fmt.Sprintf("unimplemented: %T", decl))
		}
	}

	// Any error?
	if trans.err != nil {
		for _, err := range trans.err {
			fmt.Fprintf(os.Stderr, "%s\n", err.Error())
		}
		return errors.New("Error: not supported in JavaScript")
	}

	// Export declarations in packages
	//
	// https://developer.mozilla.org/en/JavaScript/Reference/Statements/export
	if getExpression(node.Name) != "main" && len(trans.public) != 0 {
		for i, v := range trans.public {
			if i == 0 {
				trans.WriteString(NL + NL + "export " + v)
			} else {
				trans.WriteString("," + SP + v)
			}
		}

		trans.WriteString(";")
	}
	trans.WriteString(NL)

	// === Write
	//name := strings.Replace(filename, path.Ext(filename), "", 1)
	str := trans.String()

	// Version to debug
	deb := strings.Replace(str, NL, "\n", -1)
	deb = strings.Replace(deb, TAB, "\t", -1)
	deb = strings.Replace(deb, SP, " ", -1)

	/*if err := ioutil.WriteFile(name+".js", []byte(deb), 0664); err != nil {
		return err
	}

	// Minimized version
	min := strings.Replace(str, NL, "", -1)
	min = strings.Replace(min, TAB, "", -1)
	min = strings.Replace(min, SP, "", -1)

	if err := ioutil.WriteFile(name + ".min.js", []byte(min), 0664); err != nil {
		return err
	}*/

	fmt.Print(deb) // TODO: delete*/
	return nil
}