// ---------- Referencing the HTML elements: ----------
const borderThicknessInput = document.querySelector('#slider');
const borderColorInput = document.querySelector('#stroke');
const textInput = document.querySelector('#texte');
const textColorInput = document.querySelector('#couleur');
const textPosition = document.querySelector('#translate');

// ---------- Referencing SVG elements: ----------
const border = document.querySelector('.cls-1');
const textDisplayed = document.querySelector('.cls-2');

//Events listener for user inputs
// border:
borderColorInput.addEventListener('input', applyBorderColor);
borderThicknessInput.addEventListener('input', applyBorderThickness);
//text:
textInput.addEventListener('input', changeText);
textColorInput.addEventListener('input', applyTextColor);
textPosition.addEventListener('input', applyTextPosition);

// ---------- Functions that modify the style of the Tab ----------
// border
function applyBorderThickness(){
    let num = Number(borderThicknessInput.value);
    border.setAttribute('stroke-width', num);
};
function applyBorderColor(){
    border.setAttribute('stroke' , borderColorInput.value);
};
// text
function changeText(){
    textDisplayed.innerHTML = textInput.value;
}
function applyTextColor(){
    textDisplayed.setAttribute('fill', textColorInput.value);
}
function applyTextPosition(){
    textDisplayed.setAttribute('transform', `translate( ${textPosition.value} 28.65)`);

}


// NOW WORK on a function to export the svg and then convert it into png ? 
// Two download buttons, one png, one svg ? -> Transparent background. 
let inlineSVG = document.querySelector('svg');


let dlButtonSVG = document.querySelector('.downloadSVG');
let dlButtonPNG = document.querySelector('.downloadPNG');

dlButtonSVG.addEventListener('click', function(){
    downloadSVG('onglet.svg', inlineSVG.outerHTML)
});

function downloadSVG(filename, data){
    let link = document.createElement('a');
    let strDataURI ='data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(data); // Converts svg source to URI data scheme
    link.setAttribute('href', strDataURI); 
    link.setAttribute('download', filename);
    link.style.display = 'none';
    link.click()
}


function drawInlineSVG(svgElement, ctx, callback) {
    var svgURL = new XMLSerializer().serializeToString(svgElement); // Equivalent to ligne 58 (strDataURI with encodeURIComponent(data)  )
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(this, 0, 0);
      callback();
    }
    img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
  }


dlButtonPNG.addEventListener('click', function(){
    let canvas = document.querySelector('canvas');
    let ctxt = canvas.getContext('2d');
    canvas.style.display = 'none';
    drawInlineSVG(inlineSVG, ctxt, function() {
        let link = document.createElement('a');
        link.setAttribute('href', canvas.toDataURL()); 
        link.setAttribute('download', 'onglet.png');
        link.style.display = 'none';
        link.click()
      });
});
