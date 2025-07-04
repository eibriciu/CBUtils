import { Utils } from '../core/utils.js';
import { Selectors } from '../core/selectors.js';

export function packageSelector() {
  const input = document.querySelector(Selectors.PACKAGE_INPUT);
  if (!input || input.dataset.roteiroAplicado === 'true') return;
  
  input.dataset.roteiroAplicado = 'true';

  const detailBtn = document.querySelector(Selectors.CART_DETAILS_BUTTON);
  if (detailBtn) detailBtn.click();

  let tentativas = 0;
  const maxTent = 50;
  const intervalo = 200;

  const poll = setInterval(() => {
    tentativas++;
    const elNoites = Array.from(document.querySelectorAll('p')).find((p) =>
      /\d+\s+noites?/i.test(p.textContent)
    );

    if (elNoites) {
      clearInterval(poll);
      const texto = elNoites.textContent.trim();
      const match = texto.match(/(\d+)/);
      const totalNoites = match ? parseInt(match[1], 10) : 0;

      const options = [
        { text: 'Selecione o Roteiro | Select your Package', value: '' }
      ];

      if (totalNoites >= 6) {
        options.push({ text: 'Imersão | Imersion', value: 'Imersão' });
      } else {
        options.push(
          { text: 'Conexão | Connection', value: 'Conexão' },
          { text: 'Selvagem | Wild', value: 'Selvagem' }
        );
      }

      const select = Utils.createSelect(options);
      input.style.display = 'none';
      input.parentNode.insertBefore(select, input);

      const erro = Utils.createErrorElement('erro-roteiro', input.parentNode);

      select.addEventListener('change', (e) => {
        const v = e.target.value;
        if (v === 'Imersão' && totalNoites < 6) {
          erro.innerText = "Roteiro 'Imersão' exige no mínimo 6 noites.";
          erro.style.display = 'block';
          Utils.triggerReactInputEvent(input, '');
        } else {
          erro.style.display = 'none';
          Utils.triggerReactInputEvent(input, v);
        }
      });
    } else if (tentativas >= maxTent) {
      clearInterval(poll);
    }
  }, intervalo);
}