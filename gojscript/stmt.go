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
	"fmt"
	"go/ast"
	"go/token"
	"strings"
)

// Represents data for a statement.
type dataStmt struct {
	tabLevel int  // tabulation level
	isReturn bool // last statement was "return"?
}

// Transforms the Go statement.
func (tr *transform) getStatement(stmt ast.Stmt) {
	switch typ := stmt.(type) {

	// http://golang.org/pkg/go/ast/#AssignStmt || godoc go/ast AssignStmt
	//  Lhs    []Expr
	//  TokPos token.Pos   // position of Tok
	//  Tok    token.Token // assignment token, DEFINE
	//  Rhs    []Expr
	case *ast.AssignStmt:
		var isNew bool

		switch typ.Tok {
		case token.DEFINE:
			isNew = true
		case token.ASSIGN:
		default:
			panic(fmt.Sprintf("token unimplemented: %T", typ.Tok))
		}

		if isNew {
			tr.WriteString("var ")
		}

		isFirst := true
		for i, v := range typ.Lhs {
			lIdent := getExpression(v)

			if lIdent == "_" {
				continue
			}

			rIdent := getExpression(typ.Rhs[i])

			if isFirst {
				isFirst = false
			} else {
				tr.WriteString("," + SP)
			}

			tr.WriteString(lIdent + SP + "=" + SP + rIdent)
		}
		tr.WriteString(";")

	// http://golang.org/pkg/go/ast/#BlockStmt || godoc go/ast BlockStmt
	//  Lbrace token.Pos // position of "{"
	//  List   []Stmt
	//  Rbrace token.Pos // position of "}"
	case *ast.BlockStmt:
		tr.WriteString("{")
		tr.tabLevel++

		for _, v := range typ.List {
			tr.addLine(v.Pos())
			tr.WriteString(strings.Repeat(TAB, tr.tabLevel))
			tr.getStatement(v)
		}

		tr.tabLevel--
		tr.addLine(typ.Rbrace)
		tr.WriteString(strings.Repeat(TAB, tr.tabLevel) + "}")

	// http://golang.org/pkg/go/ast/#CaseClause || godoc go/ast CaseClause
	//  Case  token.Pos // position of "case" or "default" keyword
	//  List  []Expr    // list of expressions or types; nil means default case
	//  Colon token.Pos // position of ":"
	//  Body  []Stmt    // statement list; or nil
	case *ast.CaseClause:
		tr.addLine(typ.Case)

		if typ.List != nil {
			for i, expr := range typ.List {
				if i != 0 {
					tr.WriteString(SP)
				}
				tr.WriteString(fmt.Sprintf("case %s:", getExpression(expr)))
			}
		} else {
			tr.WriteString("default:")
		}

		if typ.Body != nil {
			tr.isReturn = false // to check the last statement

			for _, v := range typ.Body {
				if ok := tr.addLine(v.Pos()); ok {
					tr.WriteString(strings.Repeat(TAB, tr.tabLevel+1))
				} else {
					tr.WriteString(SP)
				}
				tr.getStatement(v)
			}
		}

		if !tr.isReturn {
			tr.WriteString(SP + "break;")
		}

	// http://golang.org/pkg/go/ast/#ExprStmt || godoc go/ast ExprStmt
	//  X Expr // expression
	/*case *ast.ExprStmt:
		tr.WriteString(getExpression(typ.X))*/

	// http://golang.org/pkg/go/ast/#GoStmt || godoc go/ast GoStmt
	//  Go   token.Pos // position of "go" keyword
	//  Call *CallExpr
	case *ast.GoStmt:
		tr.addError("%s: goroutine", tr.fset.Position(typ.Go))

	// http://golang.org/doc/go_spec.html#If_statements
	// https://developer.mozilla.org/en/JavaScript/Reference/Statements/if...else
	//
	// http://golang.org/pkg/go/ast/#IfStmt || godoc go/ast IfStmt
	//  If   token.Pos // position of "if" keyword
	//  Init Stmt      // initialization statement; or nil
	//  Cond Expr      // condition
	//  Body *BlockStmt
	//  Else Stmt // else branch; or nil
	case *ast.IfStmt:
		if typ.Init != nil {
			tr.getStatement(typ.Init)
			tr.WriteString(SP)
		}

		tr.WriteString(fmt.Sprintf("if%s(%s)%s", SP, getExpression(typ.Cond), SP))
		tr.getStatement(typ.Body)

		if typ.Else != nil {
			tr.WriteString(SP + "else ")
			tr.getStatement(typ.Else)
		}

	// http://golang.org/doc/go_spec.html#Return_statements
	// https://developer.mozilla.org/en/JavaScript/Reference/Statements/return
	//
	// http://golang.org/pkg/go/ast/#ReturnStmt || godoc go/ast ReturnStmt
	//  Return  token.Pos // position of "return" keyword
	//  Results []Expr    // result expressions; or nil
	case *ast.ReturnStmt:
		tr.isReturn = true

		if typ.Results == nil {
			tr.WriteString("return;")
			break
		}

		if len(typ.Results) != 1 {
			tr.addError("%s: return multiple values", tr.fset.Position(typ.Return))
			break
		}
		tr.WriteString("return " + getExpression(typ.Results[0]) + ";")

	// http://golang.org/doc/go_spec.html#Switch_statements
	// https://developer.mozilla.org/en/JavaScript/Reference/Statements/switch
	//
	// http://golang.org/pkg/go/ast/#SwitchStmt || godoc go/ast SwitchStmt
	//  Switch token.Pos  // position of "switch" keyword
	//  Init   Stmt       // initialization statement; or nil
	//  Tag    Expr       // tag expression; or nil
	//  Body   *BlockStmt // CaseClauses only
	case *ast.SwitchStmt:
		tag := ""

		if typ.Init != nil {
			tr.getStatement(typ.Init)
			tr.WriteString(SP)
		}
		if typ.Tag != nil {
			tag = getExpression(typ.Tag)
		} else {
			tag = "1" // true
		}

		tr.WriteString(fmt.Sprintf("switch%s(%s)%s", SP, tag, SP))
		tr.getStatement(typ.Body)

	default:
		panic(fmt.Sprintf("unimplemented: %T", stmt))
	}
}