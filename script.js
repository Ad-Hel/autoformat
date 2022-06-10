// Var declaration
const baseText = document.getElementById('base');
const editText = document.getElementById('edit');
const editableText = document.getElementById('editable');
const formatedText = document.getElementById('formated');

// Functions
function previewText(e){
  editText.value = e.target.value;
};

function splitText(text){
  return text.split(' ');
};

function clearString(string){
  if (!string){
    return;
  }
  const noTestCars = /[.,)(-_;:]/g;
  const lowCase = string.toLowerCase();
  const clear = lowCase.replaceAll( noTestCars, '');
  return clear;
}

function findDiff(arrBase, arrNew){
  const diff = arrNew.reduce((inter, curr, currIndex) => {
    //console.log('curr : ' + curr);
    //console.log('currIndex: ' + currIndex);
    //console.log('inter : ' + inter);
    let delta = inter.length;
    //console.log('delta : ' + delta);
    //console.log(currIndex - delta);
    //console.log('base  : ' + arrBase[currIndex - delta])
    const clearCurr = clearString(curr);
    //console.log('clearCurr : ' + clearCurr);
    const clearBase = clearString(arrBase[currIndex - delta]);
    //console.log('clearBase : ' + clearBase);
   
    if (clearCurr ===  clearBase ){
      // console.log(JSON.stringify(inter) + ' ' + currIndex);
      return inter;
    } 
    inter[inter.length] = (currIndex);
    // console.log(JSON.stringify(inter) + ' ' + currIndex);
    return inter;
  }, []);
  return diff;
}

function formatDiff(arrDiff, arrNew){
  let editable = '';
  arrNew.forEach((word, index) => {
    const bold = arrDiff.includes(index);
    if (bold){
      editable += '**'+ word + '**' + ' ';
    } else {
      editable += word + ' ';
    };
  });
  editable = editable.replaceAll('** **', ' ')
  return editable
}

function showEditable(e){
  const base = splitText(baseText.value);
  //console.log("base : " + base);
  const edit = splitText(e.target.value);
  //console.log("edit : "  + edit);
  const diff = findDiff(base, edit);
  //console.log("diff : " + JSON.stringify(diff));
  const editable = formatDiff(diff, edit);
  //console.log("html : " + html);
  editableText.value = editable;
  showFormated();
}

function showFormated(){
    let text = editableText.value;
    while (text.search(/\*\*/g) > 0){
        text = text.replace(/\*\*/, '<b>')
        text = text.replace(/\*\*/, '</b>')
    };
    formatedText.innerHTML = text;
}

// Event listeners
baseText.addEventListener('change', previewText);
editText.addEventListener('change', showEditable);
editableText.addEventListener('change', showFormated);

