(() => {
  if (!cm) {
    console.log("cm global variable is not around");
    return;
  }
  console.log(`[hydracula]: blood stain/ mancha 'e sangre`);
  addListeners();
  function addListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.ctrlKey) {
        const condition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          .map((x) => `Digit${x}`)
          .includes(e.code);
        if (condition) {
          replaceNumberByFunction(e);
        }
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.ctrlKey) {
        if (e.code === "Period") {
          selectWordAtCursor(e);
        } else if (e.code === "Comma") {
          selectWordAtCursor(e, false);
        }
      }
    });
  }
  const validTokenTypes = ["variable", "property", "number", "operator"];
  const invalidOperators = ["=>"];
  function selectWordAtCursor(e, isForward = true) {
    e.preventDefault();

    // console.clear();
    const start = isForward ? "head" : "anchor";
    const cursor = cm.getCursor(start);
    const { line: lineNumber } = cursor;
    let cursorCharacterPosition = cursor.ch;
    const lineTokens = cm.getLineTokens(lineNumber);
    let currentToken;
    /**
     * find the token at the current cursor position which is not of type null
     */
    for (let index = 0; index < lineTokens.length; index++) {
      const token = lineTokens[index];
      let isInRange = isForward
        ? token.start <= cursorCharacterPosition &&
          cursorCharacterPosition < token.end
        : token.start < cursorCharacterPosition &&
          cursorCharacterPosition <= token.end;
      const isValidType = validTokenTypes.includes(token.type);
      if (isInRange && isValidType) {
        currentToken = token;
        break;
      }
    }
    // console.log("currentToken: ", currentToken);
    const lastToken = lineTokens[lineTokens.length - 1];
    const lineLength = lastToken.end;
    const lastLine = cm.lastLine();
    if (currentToken) {
      const anchor = { line: lineNumber, ch: currentToken.start };
      const head = { line: lineNumber, ch: currentToken.end };
      cm.setSelection(anchor, head);
      const selection = cm.getSelection();
      const isInvalidOperator = invalidOperators.includes(selection);
      if (isInvalidOperator) {
        selectWordAtCursor(isForward);
      }
    } else {
      const sense = isForward ? 1 : -1;
      const nextPosition = cursorCharacterPosition + sense;
      const nextLine = lineNumber + sense;
      const nextPositionCondition = isForward
        ? nextPosition >= lineLength
        : nextPosition <= 0;
      if (nextPositionCondition) {
        const nextLinePositionCondition = isForward
          ? nextLine > lastLine
          : nextLine < 0;
        if (nextLinePositionCondition) {
          return;
        } else {
          let nextPosition2;
          if (isForward) {
            nextPosition2 = 0;
          } else {
            const lineTokens = cm.getLineTokens(nextLine);
            nextPosition2 = lineTokens[lineTokens.length - 1].end;
          }

          cm.setCursor(nextLine, nextPosition2);
        }
      } else {
        cm.setCursor(lineNumber, nextPosition);
      }
      selectWordAtCursor(isForward);
    }
  }
  function replaceNumberByFunction(e) {
    e.preventDefault();
    const n = e.code.replace("Digit", "");
    console.log("n: ", n);
    // console.log("dv: ", dv.editor().doc);
    const doc = cm.doc;
    const selection = doc.getSelection();
    console.log("selection: ", selection);
    const number = Number(selection);
    if (isNaN(number)) return;
    if (!selection) {
      return;
    }
    const replacement = replacements[n];
    if (replacement) {
      doc.replaceSelection(replacement);
    }
  }
  const replacements = {
    1: "()=>time",
    2: "()=>Math.sin(time*1.0)*1.0",
    3: "()=>(time/1)%1",
  };
})();
