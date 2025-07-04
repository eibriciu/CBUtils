import { Utils } from '../core/utils.js';
import { Selectors } from '../core/selectors.js';

export function documentTypeDropdown() {
  const input = document.querySelector(Selectors.DOCUMENT_TYPE_INPUT);
  if (!input || input.dataset.dropdownAplicado === 'true') return;
  
  input.dataset.dropdownAplicado = 'true';
  
  const select = Utils.createSelect([
    { text: 'Selecione: CPF ou Passaporte | Brazilian ID or Passport', value: '' },
    { text: 'CPF | Brazilian ID', value: 'CPF' },
    { text: 'Passaporte | Passport', value: 'Passaporte' }
  ]);

  input.style.display = 'none';
  input.parentNode.insertBefore(select, input);
  
  const erro = Utils.createErrorElement('erro-tipo-documento', select.parentNode);

  select.addEventListener('change', (e) => {
    const valor = e.target.value;
    if (valor === 'CPF' || valor === 'Passaporte') {
      erro.style.display = 'none';
      Utils.triggerReactInputEvent(input, valor);
    } else {
      erro.innerText = 'Selecione CPF ou Passaporte. | Please Select CPF or Passport';
      erro.style.display = 'block';
    }
  });
}