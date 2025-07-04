import { Utils } from '../core/utils.js';
import { Selectors } from '../core/selectors.js';

export function guideLanguageDropdown() {
  const input = document.querySelector(Selectors.GUIDE_LANGUAGE_INPUT);
  if (!input || input.dataset.dropdownAplicado === 'true') return;
  
  input.dataset.dropdownAplicado = 'true';
  
  const select = Utils.createSelect([
    { text: 'Selecione o idioma do guia | Select guide language', value: '' },
    { text: 'Português | Portuguese', value: 'Português' },
    { text: 'Inglês | English', value: 'Inglês' }
  ]);

  input.style.display = 'none';
  input.parentNode.insertBefore(select, input);
  
  const erro = Utils.createErrorElement('erro-guia', select.parentNode);

  select.addEventListener('change', (e) => {
    const valor = e.target.value;
    if (valor === 'Português' || valor === 'Inglês') {
      erro.style.display = 'none';
      Utils.triggerReactInputEvent(input, valor);
    } else {
      erro.innerText = 'Selecione o idioma do guia. | Please select the guide language.';
      erro.style.display = 'block';
    }
  });
}