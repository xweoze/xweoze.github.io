(() => {
  const player = document.getElementById('lp-player');
  const audio = player.querySelector('audio');
  const button = player.querySelector('.lp-toggle');
  const disc = player.querySelector('.lp-disc');
  const storageKey = 'afterglow:lp:' + audio.src;
  const actions = {
    paused: '재생',
    playing: '일시정지',
    loading: '불러오는 중, 재생 취소',
    ended: '다시 재생',
    error: '재생 불가'
  };
  let pendingTime = null;
  let atEnd = false;
  let leaving = false;
  let storageAvailable = true;
  let requestId = 0;

  function display(state) {
    const label = player.dataset.track + ' · ' + actions[state];
    player.dataset.state = state;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.disabled = state === 'error';
  }

  function sync(activeState) {
    if (leaving) return;
    if (audio.error) display('error');
    else if (atEnd || audio.ended) display('ended');
    else if (audio.paused) display('paused');
    else display(activeState);
  }

  function readPosition() {
    let raw;
    try {
      raw = sessionStorage.getItem(storageKey);
    } catch {
      storageAvailable = false;
      return null;
    }
    try {
      const saved = JSON.parse(raw);
      if (saved && Number.isFinite(saved.time) && saved.time >= 0 &&
          ['playing', 'paused', 'ended'].includes(saved.mode)) return saved;
    } catch { /* Discard an invalid bookmark. */ }
    return null;
  }

  function savePosition() {
    if (leaving) return;
    const mode = atEnd || audio.ended ? 'ended' : audio.paused || audio.error ? 'paused' : 'playing';
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        mode,
        time: pendingTime ?? audio.currentTime,
        rotationTime: disc.getAnimations()[0]?.currentTime ?? 0
      }));
    } catch { storageAvailable = false; }
  }

  // Apply the seek before play(), including when the initial gesture precedes metadata.
  function seek(time) {
    pendingTime = time;
    if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) {
      audio.currentTime = time;
    } else {
      audio.currentTime = Number.isFinite(audio.duration) ? Math.min(time, audio.duration) : time;
      pendingTime = null;
    }
  }

  // A tap produces one click. Scrolling and keyboard navigation should stay silent.
  function unlockOnClick(event) {
    if (event.isTrusted && event.detail > 0 && !button.contains(event.target)) play();
  }

  async function play(automatic = false) {
    document.removeEventListener('click', unlockOnClick);
    const id = ++requestId;
    if (atEnd || audio.ended) {
      atEnd = false;
      seek(0);
    }
    display('loading');
    try {
      await audio.play();
    } catch (error) {
      if (id !== requestId || leaving) return;
      if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
        sync('loading');
        if (automatic && error.name === 'NotAllowedError') {
          document.addEventListener('click', unlockOnClick);
        }
      } else display('error');
      savePosition();
    }
  }

  function restore(firstLoad) {
    leaving = false;
    const saved = readPosition();
    atEnd = saved?.mode === 'ended';
    seek(saved?.time ?? Number(player.dataset.start));
    const rotation = disc.getAnimations()[0];
    if (rotation && Number.isFinite(saved?.rotationTime)) rotation.currentTime = saved.rotationTime;
    sync('loading');
    if (audio.error) return;

    // A full Chirpy navigation replaces the audio element. Resume only a playing record.
    savePosition();
    const enteringSite = !document.referrer.startsWith(location.origin + '/') &&
      (performance.getEntriesByType('navigation')[0]?.type ?? 'navigate') === 'navigate';
    const firstEntry = firstLoad && !saved && (storageAvailable || enteringSite);
    if (saved?.mode === 'playing' || firstEntry) play(true);
  }

  audio.addEventListener('loadedmetadata', () => {
    if (pendingTime !== null) seek(pendingTime);
  });
  for (const event of ['play', 'waiting', 'seeking']) {
    audio.addEventListener(event, () => sync('loading'));
  }
  audio.addEventListener('playing', () => {
    sync('playing');
    savePosition();
  });
  audio.addEventListener('seeked', () => {
    sync(audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA ? 'playing' : 'loading');
  });
  audio.addEventListener('pause', () => {
    if (audio.paused) {
      sync('loading');
      savePosition();
    }
  });
  audio.addEventListener('ended', () => {
    atEnd = audio.ended;
    sync('loading');
    savePosition();
  });
  audio.addEventListener('error', () => {
    display('error');
    savePosition();
  });
  button.addEventListener('click', () => {
    if (audio.paused || audio.ended) play();
    else {
      ++requestId;
      audio.pause();
      sync('loading');
      savePosition();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) savePosition();
  });
  window.addEventListener('pagehide', () => {
    savePosition();
    leaving = true;
    ++requestId;
    document.removeEventListener('click', unlockOnClick);
    audio.pause();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) restore(false);
  });
  restore(true);
})();
