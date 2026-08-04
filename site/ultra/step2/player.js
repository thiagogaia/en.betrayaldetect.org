let player;
let isPlaying = false;
let isPlayerReady = false;
let playerCheckInterval;
let cleanupInterval;

// Configuração do vídeo
const DEFAULT_VIDEO_ID = "0T57ODIbKfE";

// Função para verificar se elementos existem antes de manipular
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Elemento ${id} não encontrado`);
    return null;
  }
  return element;
}

// Carregar API do YouTube com tratamento de erro
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    initializePlayer();
    return;
  }

  window.onYouTubeIframeAPIReady = function () {
    console.log("API do YouTube carregada com sucesso");
    initializePlayer();
  };

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  tag.onerror = function () {
    console.error("Erro ao carregar API do YouTube");
    showError("Erro ao carregar o player");
  };

  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Inicializar player com tratamento de erro robusto
function initializePlayer() {
  if (isPlayerReady) return;

  try {
    player = new YT.Player("player", {
      height: "100%",
      width: "100%",
      videoId: DEFAULT_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        cc_load_policy: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        widget_referrer: window.location.origin,
        autohide: 1,
        wmode: "opaque",
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  } catch (error) {
    console.error("Erro ao criar player:", error);
    showError("Erro ao inicializar o player");
  }
}

// Player pronto - com verificação de segurança
function onPlayerReady(event) {
  console.log("Player pronto");
  isPlayerReady = true;

  // Verificar se elementos existem antes de manipular
  const loadingSpinner = safeGetElement("loadingSpinner");
  const customControls = safeGetElement("customControls");

  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }

  if (customControls) {
    customControls.style.display = "flex";
  }

  // Configurar overlay de proteção
  setupVideoProtection();

  // Iniciar limpeza contínua
  startContinuousCleanup();
}

// Configurar proteção completa do vídeo
function setupVideoProtection() {
  const iframe = document.querySelector("#player iframe");
  if (iframe) {
    // Remover pointer events do iframe
    iframe.style.pointerEvents = "none";
    iframe.style.userSelect = "none";
    iframe.style.webkitUserSelect = "none";
    iframe.style.mozUserSelect = "none";
    iframe.style.msUserSelect = "none";

    // Prevenir context menu
    iframe.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });

    // Bloquear drag and drop
    iframe.addEventListener("dragstart", function (e) {
      e.preventDefault();
      return false;
    });
  }

  // Configurar overlay de proteção
  const overlay = safeGetElement("videoOverlay");
  if (overlay) {
    overlay.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });

    overlay.addEventListener("mouseover", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    overlay.addEventListener("mouseenter", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

// Limpeza contínua para remover elementos do YouTube
function startContinuousCleanup() {
  // Limpar imediatamente
  cleanupYouTubeElements();

  // Configurar limpeza contínua
  cleanupInterval = setInterval(() => {
    cleanupYouTubeElements();
    enforceVideoProtection();
  }, 100); // Verificar a cada 100ms para ser mais efetivo
}

// Limpeza de elementos do YouTube
function cleanupYouTubeElements() {
  const iframe = document.querySelector("#player iframe");
  if (!iframe) return;

  try {
    // Tentar acessar e limpar conteúdo do iframe
    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframe.contentDocument;

    if (iframeDocument) {
      // Remover elementos específicos
      const selectorsToRemove = [
        ".ytp-chrome-top",
        ".ytp-show-cards-title",
        ".ytp-title",
        ".ytp-title-text",
        ".ytp-title-link",
        ".ytp-title-channel",
        ".ytp-title-expanded-heading",
        ".ytp-videowall-still",
        ".ytp-pause-overlay",
        ".ytp-cards-teaser",
        ".ytp-ce-element",
        ".ytp-watermark",
        ".ytp-chrome-controls",
        ".ytp-gradient-top",
        ".ytp-gradient-bottom",
        ".ytp-tooltip",
        ".ytp-popup",
        ".ytp-contextmenu",
      ];

      selectorsToRemove.forEach((selector) => {
        const elements = iframeDocument.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      });

      // Injetar CSS para ocultar elementos
      let styleElement = iframeDocument.getElementById("customHideStyle");
      if (!styleElement) {
        styleElement = iframeDocument.createElement("style");
        styleElement.id = "customHideStyle";
        styleElement.textContent = `
                            .ytp-chrome-top,
                            .ytp-show-cards-title,
                            .ytp-title,
                            .ytp-title-text,
                            .ytp-title-link,
                            .ytp-title-channel,
                            .ytp-title-expanded-heading,
                            .ytp-videowall-still,
                            .ytp-pause-overlay,
                            .ytp-cards-teaser,
                            .ytp-ce-element,
                            .ytp-watermark,
                            .ytp-chrome-controls,
                            .ytp-tooltip,
                            .ytp-popup,
                            .ytp-contextmenu {
                                display: none !important;
                                visibility: hidden !important;
                                opacity: 0 !important;
                                pointer-events: none !important;
                                position: absolute !important;
                                top: -9999px !important;
                                left: -9999px !important;
                            }
                            * {
                                pointer-events: none !important;
                            }
                            video {
                                pointer-events: auto !important;
                            }
                        `;

        if (iframeDocument.head) {
          iframeDocument.head.appendChild(styleElement);
        }
      }
    }
  } catch (error) {
    // CORS impede acesso - isso é normal
    console.log("Limpeza limitada por CORS (comportamento esperado)");
  }
}

// Reforçar proteção do vídeo
function enforceVideoProtection() {
  const iframe = document.querySelector("#player iframe");
  if (iframe) {
    iframe.style.pointerEvents = "none";
  }
}

// Manipular clique no overlay
function handleVideoClick() {
  togglePlayPause();
}

// Mudança de estado do player
function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      updatePlayButton("⏸️");
      break;
    case YT.PlayerState.PAUSED:
      isPlaying = false;
      updatePlayButton("▶️");
      break;
    case YT.PlayerState.ENDED:
      isPlaying = false;
      updatePlayButton("▶️");
      break;
    case YT.PlayerState.BUFFERING:
      // Continuar limpeza durante buffering
      cleanupYouTubeElements();
      break;
  }
}

// Erro no player
function onPlayerError(event) {
  const loadingSpinner = safeGetElement("loadingSpinner");
  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }

  let errorMsg = "Erro ao carregar o vídeo";

  switch (event.data) {
    case 2:
      errorMsg = "ID do vídeo inválido";
      break;
    case 5:
      errorMsg = "Erro de reprodução HTML5";
      break;
    case 100:
      errorMsg = "Vídeo não encontrado";
      break;
    case 101:
    case 150:
      errorMsg = "Vídeo não permitido para reprodução incorporada";
      break;
  }

  showError(errorMsg);
}

// Toggle play/pause
function togglePlayPause() {
  if (!player || !isPlayerReady) {
    console.warn("Player não está pronto");
    return;
  }

  try {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  } catch (error) {
    console.error("Erro ao controlar reprodução:", error);
  }
}

// Atualizar botão de play/pause
function updatePlayButton(icon) {
  const playPauseBtn = safeGetElement("playPauseBtn");
  if (playPauseBtn) {
    playPauseBtn.innerHTML = icon;
  }
}

// Mostrar erro
function showError(message) {
  const errorEl = safeGetElement("errorMessage");
  const loadingSpinner = safeGetElement("loadingSpinner");

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
  }

  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }
}

// Inicialização segura
function safeInitialization() {
  try {
    loadYouTubeAPI();
  } catch (error) {
    console.error("Erro na inicialização:", error);
    showError("Erro ao inicializar o player");
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", safeInitialization);

// Limpeza antes de sair da página
window.addEventListener("beforeunload", function () {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
  }
  if (playerCheckInterval) {
    clearInterval(playerCheckInterval);
  }
});

// Prevenir erros de console relacionados ao CORS
window.addEventListener("error", function (e) {
  if (e.message && e.message.includes("postMessage")) {
    e.preventDefault();
    return false;
  }
});
