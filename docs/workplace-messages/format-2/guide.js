document.querySelectorAll('[data-copy-prompt]').forEach(button => {
  button.addEventListener('click', async () => {
    const input = document.getElementById('ai-prompt');
    const status = document.getElementById('copy-status');
    try { await navigator.clipboard.writeText(input.value); status.textContent = 'Prompt copied. Upload the guide to your AI assistant, then paste the prompt.'; button.textContent = 'Prompt copied'; }
    catch { input.focus(); input.select(); status.textContent = 'Automatic copying is unavailable. The prompt is selected; copy it using your keyboard or browser menu.'; }
  });
});
