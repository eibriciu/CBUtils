import { Selectors } from '../core/selectors.js';

export function adjustCpfLabel() {
  const labelCpf = document
    .querySelector(Selectors.CPF_INPUT)
    ?.closest('.chakra-stack')
    ?.querySelector('label');

  if (labelCpf && !labelCpf.dataset.labelAjustado) {
    labelCpf.innerText = 'CPF / Passport *';
    labelCpf.setAttribute('title', 'Número do CPF (ou Passaporte p/ Estrangeiros) *');
    labelCpf.dataset.labelAjustado = 'true';
  }
}