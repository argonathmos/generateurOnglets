/*
 * DOM ELEMENT REFERENCES 
 */

//  input fields:
const form = document.querySelector('form');
const borderThicknessInput = document.querySelector('#slider');
const borderColorInput = document.querySelector('#stroke');
const textInput = document.querySelector('#texte');
const textColorInput = document.querySelector('#couleur');
const textPosition = document.querySelector('#translate');
const textFont = document.querySelector('select');
// inline svg
const inlineSVG = document.querySelector('svg');
const border = document.querySelector('.cls-1');
const textDisplayed = document.querySelector('.cls-2');
// buttons
const dlSvgButton = document.querySelector('.downloadSVG-button');
const dlPngButton = document.querySelector('.downloadPNG-button');
const resetButton = document.querySelector('.reset-button');


/*
 * INPUT EVENT LISTENERS
 */
borderColorInput.addEventListener('input', applyBorderColor);
borderThicknessInput.addEventListener('input', applyBorderThickness);
textInput.addEventListener('input', changeText);
textColorInput.addEventListener('input', applyTextColor);
textPosition.addEventListener('input', applyTextPosition);

/*
 * CLICK EVENT LISTENERS
 */
dlSvgButton.addEventListener('click', downloadSVG);
dlPngButton.addEventListener('click', downloadPNG);
resetButton.addEventListener('click', () => {
    // clearing the form input fields
    form.reset();
    // resetting the svg to it's original parameters
    border.setAttribute('stroke', '#000000');
    border.setAttribute('stroke-width', '2.5');
    textDisplayed.setAttribute('fill', '#000000');
    textDisplayed.setAttribute('transform','translate(67.5 28.65)');
    textDisplayed.textContent = 'Titre';
    textDisplayed.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
})

/*
 * CHANGE EVENT LISTENERS
 */
textFont.addEventListener('change', applyTextFont);

/*
 * FUNCTIONS FOR STYLING THE INLINE SVG
 */
function applyBorderThickness(){
    let num = Number(borderThicknessInput.value);
    border.setAttribute('stroke-width', num);
};
function applyBorderColor(){
    border.setAttribute('stroke' , borderColorInput.value);
};
function changeText(){
    textDisplayed.innerHTML = textInput.value;
}
function applyTextColor(){
    textDisplayed.setAttribute('fill', textColorInput.value);
}
function applyTextPosition(){
    textDisplayed.setAttribute('transform', `translate( ${textPosition.value} 28.65)`);
}
function applyTextFont(){
    textDisplayed.setAttribute('font-family', textFont.value)
}


/*
 * DOWNLOAD FUNCTIONS
 */
function downloadSVG(){
    let link = document.createElement('a');
    let strDataURI ='data:image/svg+xml;charset=utf-8,'+ encodeURIComponent(inlineSVG.outerHTML); // Converts svg source to URI data scheme
    link.setAttribute('href', strDataURI); 
    link.setAttribute('download', 'onglet_' + textInput.value + '.svg');
    link.style.display = 'none';
    link.click()
}

function downloadPNG() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(inlineSVG.outerHTML));
    // draw image onto canvas before downloading the canvas with URI data scheme.
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
        let link = document.createElement('a');
        link.setAttribute('href', canvas.toDataURL()); 
        link.setAttribute('download', 'onglet_' + textInput.value + '.png');
        link.style.display = 'none';
        link.click()
    };
  }
