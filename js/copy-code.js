document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre > code');

  codeBlocks.forEach((codeElement) => {
    const preElement = codeElement.parentElement;

    if (preElement.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    preElement.parentNode.insertBefore(wrapper, preElement);
    wrapper.appendChild(preElement);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'コードをコピー');

    button.addEventListener('click', async () => {
      const textToCopy = codeElement.innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('コピーに失敗しました:', err);
        button.textContent = 'Error';
      }
    });

    wrapper.appendChild(button);
  });
});