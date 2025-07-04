import { Utils } from '../core/utils.js';
import { Validators } from '../core/validators.js';
import { Selectors } from '../core/selectors.js';

export function birthDateMask() {
  const input = document.querySelector(Selectors.BIRTHDATE_INPUT);
  if (!input || input.dataset.mascaraAplicada === 'true') return;
  
  input.dataset.mascaraAplicada = 'true';
  input.setAttribute('inputmode', 'numeric');
  input.setAttribute('maxlength', '10');
  
  const erroData = Utils.createErrorElement('erro-data-nascimento', input.parentNode);

  input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatado = '';
    
    if (v.length > 0) formatado = v.slice(0, 2);
    if (v.length >= 3) formatado += '/' + v.slice(2, 4);
    if (v.length >= 5) formatado += '/' + v.slice(4, 8);

    Utils.triggerReactInputEvent(e.target, formatado);

    if (formatado.length === 10) {
      if (!Validators.isValidBirthDate(formatado)) {
        erroData.innerText = 'Data inválida ou idade não permitida.';
        erroData.style.display = 'block';
      } else {
        erroData.style.display = 'none';
      }
    } else {
      erroData.style.display = 'none';
    }
  });
}