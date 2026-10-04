(() => {
  const state = {layout: 'focus', theme: 'dark', scenario: 'good-morning'};
  const names = {'hi':'Hi','good-morning':'Good morning','birthday':'Birthday','anniversary':'Work anniversary'};
  const messages = {
    focus: {hi:"Hi Alex, let's get started for today! 👋",'good-morning':'Good morning Alex, small steps still move you forward. 🌱',birthday:'Hi Alex, Happy birthday! 🎉',anniversary:'Hi Alex, Happy 3-year work anniversary! 🎉'},
    classic: {hi:"Hi, Alex! 👋 Let's get started for today!",'good-morning':'Good morning, Alex! 🌱 Small steps still move you forward.',birthday:'Happy birthday, Alex! 🎉',anniversary:'Happy 3-year work anniversary, Alex! 🎉'}
  };
  const image = document.getElementById('gallery-image');
  const update = () => {
    const url = `/assets/previews/${state.layout}-${state.scenario}-${state.theme}.png`;
    image.src = url;
    image.alt = `${state.layout === 'focus' ? 'Focus' : 'Classic'} layout: ${messages[state.layout][state.scenario]}`;
    document.getElementById('gallery-open').href = url;
    document.getElementById('gallery-surface').classList.toggle('dark',state.theme === 'dark');
    document.getElementById('gallery-caption').textContent = `${state.layout === 'focus' ? 'Focus' : 'Classic'} · ${names[state.scenario]} · ${state.theme === 'dark' ? 'Dark' : 'Light'}`;
    for (const key of ['layout','theme','scenario']) for (const button of document.querySelectorAll(`[data-${key}]`)) button.setAttribute('aria-pressed',String(button.dataset[key] === state[key]));
  };
  for (const key of ['layout','theme','scenario']) for (const button of document.querySelectorAll(`[data-${key}]`)) button.addEventListener('click',() => {state[key] = button.dataset[key]; update();});
})();
