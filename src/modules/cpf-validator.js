import { Utils } from '../core/utils.js';
import { Validators } from '../core/validators.js';
import { Selectors } from '../core/selectors.js';

export function cpfValidator() {
  const cpfInput = document.querySelector(Selectors.CPF_INPUT);
  if (!cpfInput || cpfInput.dataset.validadorAplicado === 'true') return;
  
  cpfInput.dataset.validadorAplicado = 'true';
  const erro = Utils.createErrorElement('erro-cpf-passaporte', cpfInput.parentNode);

  cpfInput.addEventListener('input', (e) => {
    const val = e.target.value;
    
    if (Validators.hasInvalidTerms(val)) {
      erro.innerText = 'Invalido | Invalid';
      erro.style.display = 'block';
      return Utils.triggerReactInputEvent(e.target, val);
    }
    
    const nums = val.replace(/\D/g, '');
    if (nums.length === 11) {
      const fmt = nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      if (Validators.isValidCPF(nums)) {
        erro.style.display = 'none';
      } else {
        erro.innerText = 'CPF inválido.';
        erro.style.display = 'block';
      }
      return Utils.triggerReactInputEvent(e.target, fmt);
    }
    
    erro.style.display = 'none';
    Utils.triggerReactInputEvent(e.target, val);
  });
}