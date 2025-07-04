export const Utils = {
    triggerReactInputEvent(input, value) {
      if (input.value === value) return;
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value'
      ).set;
      setter.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
  
    createErrorElement(id, parentNode) {
      let erro = document.getElementById(id);
      if (!erro) {
        erro = document.createElement('div');
        erro.id = id;
        erro.style.cssText = 'color:red;font-size:0.9em;margin-top:4px;display:none';
        parentNode.appendChild(erro);
      }
      return erro;
    },
  
    createSelect(options = []) {
      const select = document.createElement('select');
      select.style.cssText = 'width:100%;padding:8px;border-radius:4px;border:1px solid #ccc;font-size:1rem';
      
      options.forEach(({ text, value }) => {
        select.appendChild(new Option(text, value));
      });
      
      return select;
    }
  };