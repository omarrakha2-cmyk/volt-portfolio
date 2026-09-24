/**
 * VOLT — Minimalist Cyber-Editorial Portfolio Engine
 * Standard: $20,000 Creative Agency Portfolio
 * Performance: Ultra-Fast, Zero-Lag Architecture (Locked 60 FPS)
 */

// Force browser to always start at the very beginning (hero section) on reload or join
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

  // Clear any existing hash on initial load so it never jumps down
  if (window.location.hash) {
    try {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    } catch (_) {}
  }
  window.scrollTo(0, 0);

  // ==========================================================================
  // 0. BRAND INTRO VIDEO LOADING SCREEN (FULLSCREEN CINEMATIC)
  // ==========================================================================
  const preloader = document.getElementById('preloaderOverlay');
  const preloaderVideo = document.getElementById('preloaderVideo');
  const preloaderBarFill = document.getElementById('preloaderBarFill');
  const preloaderPct = document.getElementById('preloaderPct');
  const preloaderSkipBtn = document.getElementById('preloaderSkipBtn');
  let isPreloaderDismissed = false;

  function dismissPreloader() {
    if (isPreloaderDismissed || !preloader) return;
    isPreloaderDismissed = true;

    // Ensure we are anchored at the top / hero section upon entering
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });

    preloader.classList.add('is-loaded');

    // Ensure hero loop video plays smoothly upon entering
    const heroVideo = document.getElementById('heroFullscreenVideo');
    if (heroVideo && heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }

    // Remove preloader from DOM after transition completes to save GPU memory
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 900);
  }

  if (preloader && preloaderVideo) {
    // Attempt playback immediately
    preloaderVideo.play().catch(() => {});

    // Track video progress with glowing fill and percentage
    preloaderVideo.addEventListener('timeupdate', () => {
      if (preloaderVideo.duration && isFinite(preloaderVideo.duration)) {
        const pct = Math.min(100, Math.floor((preloaderVideo.currentTime / preloaderVideo.duration) * 100));
        if (preloaderBarFill) preloaderBarFill.style.width = `${pct}%`;
        if (preloaderPct) preloaderPct.textContent = `${pct}%`;
      }
    });

    // Dismiss seamlessly when intro video completes
    preloaderVideo.addEventListener('ended', dismissPreloader);

    // Adaptive failsafe based on video duration
    let failsafeTimer = setTimeout(dismissPreloader, 5500);
    preloaderVideo.addEventListener('loadedmetadata', () => {
      if (preloaderVideo.duration && isFinite(preloaderVideo.duration)) {
        clearTimeout(failsafeTimer);
        const dynamicTimeout = Math.max(3500, Math.min(Math.ceil((preloaderVideo.duration + 0.4) * 1000), 7500));
        failsafeTimer = setTimeout(dismissPreloader, dynamicTimeout);
      }
    });

    // Skip button
    if (preloaderSkipBtn) {
      preloaderSkipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissPreloader();
      });
    }

    // Keyboard quick exit (Enter, Escape, Space)
    window.addEventListener('keydown', (e) => {
      if (!isPreloaderDismissed && (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ')) {
        dismissPreloader();
      }
    });
  } else {
    dismissPreloader();
  }

  // ==========================================================================
  // 1. LENIS SMOOTH SCROLL (ULTRA-LIGHTWEIGHT, PASSIVE LISTENERS)
  // ==========================================================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    try {
      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
      });

      // Guarantee initial anchor at hero section top
      lenis.scrollTo(0, { immediate: true });

      function lenisRaf(time) {
        if (lenis) lenis.raf(time);
        requestAnimationFrame(lenisRaf);
      }
      requestAnimationFrame(lenisRaf);
    } catch (e) {
      console.warn('Lenis notice:', e);
    }
  }

  // Smooth in-page anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -30, duration: 1.1 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==========================================================================
  // 2. HERO FULLSCREEN 4K VIDEO PLAYBACK ASSURANCE
  // ==========================================================================
  const heroVideo = document.getElementById('heroFullscreenVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.play().catch(() => {});
  }

  // ==========================================================================
  // 3. SEGMENTED FILTER BAR & DYNAMIC 3-COLUMN METADATA ROW
  // ==========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const tabIndicator = document.getElementById('tabIndicator');
  const workCards = document.querySelectorAll('.work-glass-card');

  // Metadata content definitions for each tab
  const metadataConfig = {
    all: {
      tools: {
        title: 'Editing & Compositing Engine',
        desc: 'Premiere Pro 2026, After Effects, Mocha 3D Tracking'
      },
      spec: {
        title: 'Viewer Retention Focus',
        desc: 'Retention Engineering, Kinetic Typography, Viral Hooks'
      },
      delivery: {
        title: 'Commercial Terms',
        desc: '6+ Years Exp • 48h Turnaround • Flexible Project Pricing'
      }
    },
    gaming: {
      tools: {
        title: 'Gaming Pacing Pipeline',
        desc: 'Premiere Pro 2026, Soundly Foley, High-Bitrate 120FPS'
      },
      spec: {
        title: 'Esports & Retention Strategy',
        desc: 'Micro-Hooks, Pattern Interrupts, Beat Synchronization'
      },
      delivery: {
        title: 'Speed & ROI',
        desc: 'High-ROI YouTube Cuts • 24-48h Draft Delivery • Creator Retainers'
      }
    },
    motion: {
      tools: {
        title: 'Motion & 3D Suite',
        desc: 'After Effects, Cinema 4D, Mocha Pro, Blender 3D'
      },
      spec: {
        title: 'Spatial Dynamics',
        desc: 'Kinetic Typography, 3D Camera Depth, Studio VFX Keying'
      },
      delivery: {
        title: 'Asset Delivery',
        desc: 'Full Alpha Channels, 4K Pro-Res & Vector Source Handover'
      }
    },
    shorts: {
      tools: {
        title: '9:16 Vertical Engine',
        desc: 'Mobile-First Framing, Dynamic Captions, High-Frequency SFX'
      },
      spec: {
        title: 'Sub-Second Engagement',
        desc: '0.8s Cliffhangers, Psychological Swipes, Visual Stimulation'
      },
      delivery: {
        title: 'Scale & Cadence',
        desc: 'High-Volume Batch Production • Sub-24h Revisions • Viral Growth'
      }
    }
  };

  const metaColToolsTitle = document.getElementById('metaColToolsTitle');
  const metaColToolsDesc = document.getElementById('metaColToolsDesc');
  const metaColSpecTitle = document.getElementById('metaColSpecTitle');
  const metaColSpecDesc = document.getElementById('metaColSpecDesc');
  const metaColDeliveryTitle = document.getElementById('metaColDeliveryTitle');
  const metaColDeliveryDesc = document.getElementById('metaColDeliveryDesc');

  function updateDynamicMetadata(category) {
    const data = metadataConfig[category] || metadataConfig.all;
    const elementsToUpdate = [
      { el: metaColToolsTitle, text: data.tools.title },
      { el: metaColToolsDesc, text: data.tools.desc },
      { el: metaColSpecTitle, text: data.spec.title },
      { el: metaColSpecDesc, text: data.spec.desc },
      { el: metaColDeliveryTitle, text: data.delivery.title },
      { el: metaColDeliveryDesc, text: data.delivery.desc }
    ];

    elementsToUpdate.forEach(item => {
      if (item.el) {
        item.el.style.opacity = '0';
        item.el.style.transform = 'translateY(4px)';
      }
    });

    setTimeout(() => {
      elementsToUpdate.forEach(item => {
        if (item.el) {
          item.el.textContent = item.text;
          item.el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          item.el.style.opacity = '1';
          item.el.style.transform = 'translateY(0)';
        }
      });
    }, 160);
  }

  function positionTabIndicator(activeBtn) {
    if (!tabIndicator || !activeBtn) return;
    const left = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;
    tabIndicator.style.transform = `translate3d(${left}px, 0, 0)`;
    tabIndicator.style.width = `${width}px`;
  }

  // Initialize indicator position
  const initialActiveBtn = document.querySelector('.filter-tab-btn.active');
  if (initialActiveBtn) {
    setTimeout(() => {
      positionTabIndicator(initialActiveBtn);
    }, 150);
  }

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.filter-tab-btn.active');
    if (currentActive) positionTabIndicator(currentActive);
  }, { passive: true });

  // Tab click filtering
  filterTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterTabs.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      positionTabIndicator(btn);

      const category = btn.getAttribute('data-tab') || 'all';
      updateDynamicMetadata(category);

      // Filter showcase cards
      workCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category') || '';
        const shouldShow = category === 'all' || cardCat.split(' ').includes(category);

        if (shouldShow) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0, 14px, 0)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translate3d(0, 0, 0)';
          }, 35);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 4. MAGNETIC CYAN "PLAY" PILL CURSOR
  // ==========================================================================
  const magneticPlayPill = document.getElementById('magneticPlayPill');
  let playPillX = -100;
  let playPillY = -100;
  let targetPlayPillX = -100;
  let targetPlayPillY = -100;
  let isPlayPillActive = false;
  let playPillRafId = null;

  window.addEventListener('mousemove', (e) => {
    targetPlayPillX = e.clientX;
    targetPlayPillY = e.clientY;
    if (isPlayPillActive && !playPillRafId) {
      playPillRafId = requestAnimationFrame(renderPlayPill);
    }
  }, { passive: true });

  function renderPlayPill() {
    playPillX += (targetPlayPillX - playPillX) * 0.25;
    playPillY += (targetPlayPillY - playPillY) * 0.25;

    if (magneticPlayPill) {
      const scale = isPlayPillActive ? 'scale(1)' : 'scale(0)';
      magneticPlayPill.style.transform = `translate3d(${playPillX.toFixed(1)}px, ${playPillY.toFixed(1)}px, 0) ${scale}`;
    }

    if (isPlayPillActive || Math.abs(targetPlayPillX - playPillX) > 0.5 || Math.abs(targetPlayPillY - playPillY) > 0.5) {
      playPillRafId = requestAnimationFrame(renderPlayPill);
    } else {
      playPillRafId = null;
    }
  }

  const cardViewports = document.querySelectorAll('.card-video-viewport');
  cardViewports.forEach((vp) => {
    vp.addEventListener('mouseenter', () => {
      isPlayPillActive = true;
      if (magneticPlayPill) magneticPlayPill.classList.add('is-active');
      if (!playPillRafId) playPillRafId = requestAnimationFrame(renderPlayPill);
    }, { passive: true });

    vp.addEventListener('mouseleave', () => {
      isPlayPillActive = false;
      if (magneticPlayPill) magneticPlayPill.classList.remove('is-active');
    }, { passive: true });
  });

  // ==========================================================================
  // 5. HIGH-RESOLUTION POP-UP VIDEO LIGHTBOX MODAL (CLEAN NATIVE / MINIMALIST)
  // ==========================================================================
  const videoModal = document.getElementById('videoModal');
  const videoModalShell = document.querySelector('.video-modal-shell');
  const modalPlayerWrapper = document.getElementById('modalPlayerWrapper');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoDesc = document.getElementById('modalVideoDesc');
  const modalDirectLink = document.getElementById('modalDirectLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openVideoModal({ embedType, videoId, videoSrc, directUrl, title, desc, orientation }) {
    if (!videoModal || !modalPlayerWrapper) return;

    if (modalVideoTitle) modalVideoTitle.textContent = title || 'Volt Master Showcase';
    if (modalVideoDesc) modalVideoDesc.textContent = desc || 'Engineered with high retention rhythm, pacing, and color grading.';

    let targetUrl = directUrl;
    if (!targetUrl && embedType === 'youtube') {
      targetUrl = `https://youtu.be/${videoId}`;
    }
    if (modalDirectLink) {
      modalDirectLink.href = targetUrl || '#';
      modalDirectLink.style.display = targetUrl ? 'inline-flex' : 'none';
    }

    // Handle vertical orientation formatting
    const isVertical = orientation === 'vertical';
    if (videoModalShell) {
      if (isVertical) {
        videoModalShell.classList.add('is-vertical');
      } else {
        videoModalShell.classList.remove('is-vertical');
      }
    }

    if (embedType === 'video' || videoSrc) {
      // Clean HTML5 native video player - NO YouTube or TikTok chrome/ads/prompts!
      modalPlayerWrapper.innerHTML = `
        <video 
          class="modal-native-video" 
          src="${videoSrc || directUrl}" 
          controls 
          autoplay 
          playsinline 
          preload="auto"
          controlslist="nodownload">
        </video>
      `;
    } else if (embedType === 'youtube') {
      // Standard YouTube player with explicit referrerpolicy and origin to prevent Error 153
      const currentOrigin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'http://localhost:3000';
      modalPlayerWrapper.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(currentOrigin)}" 
          title="${title || 'Video Player'}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      `;
    } else if (embedType === 'tiktok') {
      modalPlayerWrapper.innerHTML = `
        <iframe 
          src="https://www.tiktok.com/embed/v2/${videoId}" 
          title="${title || 'TikTok Player'}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    }

    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Pause Lenis smooth scrolling while modal is open
    if (lenis) lenis.stop();
  }

  function closeVideoModal() {
    if (!videoModal || !modalPlayerWrapper) return;
    const nativeVideo = modalPlayerWrapper.querySelector('video');
    if (nativeVideo) {
      nativeVideo.pause();
      nativeVideo.src = '';
    }
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    modalPlayerWrapper.innerHTML = ''; // Terminate audio/playback immediately
    document.body.style.overflow = '';

    // Resume Lenis smooth scrolling
    if (lenis) lenis.start();
  }

  // Bind to all card click hitboxes
  document.querySelectorAll('.card-play-hitbox').forEach((hitbox) => {
    hitbox.addEventListener('click', (e) => {
      e.preventDefault();
      const embedType = hitbox.getAttribute('data-embed-type');
      const videoId = hitbox.getAttribute('data-video-id');
      const videoSrc = hitbox.getAttribute('data-video-src');
      const directUrl = hitbox.getAttribute('data-direct-url');
      const title = hitbox.getAttribute('data-title');
      const desc = hitbox.getAttribute('data-desc');
      const orientation = hitbox.getAttribute('data-orientation');

      openVideoModal({ embedType, videoId, videoSrc, directUrl, title, desc, orientation });
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // ==========================================================================
  // 5.5 GLASSY "LET'S TALK" CONTACT POPUP TAB
  // ==========================================================================
  const navLetsTalkBtn = document.getElementById('navLetsTalkBtn');
  const contactModal = document.getElementById('contactModal');
  const contactModalCloseBtn = document.getElementById('contactModalCloseBtn');
  const modalDiscordCopyBtn = document.getElementById('modalDiscordCopyBtn');
  const modalDiscordLabel = document.getElementById('modalDiscordLabel');
  const modalDiscordVal = document.getElementById('modalDiscordVal');
  const modalDiscordIcon = document.getElementById('modalDiscordIcon');

  function openContactModal() {
    if (!contactModal) return;
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  if (navLetsTalkBtn) {
    navLetsTalkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (contactModalCloseBtn) {
    contactModalCloseBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  if (modalDiscordCopyBtn) {
    modalDiscordCopyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const handle = modalDiscordCopyBtn.getAttribute('data-handle') || '3_volt_3';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(handle);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = handle;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (modalDiscordLabel) modalDiscordLabel.textContent = 'Handle Copied! ✓';
        if (modalDiscordVal) modalDiscordVal.textContent = `${handle} on clipboard`;
        if (modalDiscordIcon) modalDiscordIcon.textContent = '✓';
        showMicroToast(`Discord handle copied: ${handle} ✓`);

        setTimeout(() => {
          if (modalDiscordLabel) modalDiscordLabel.textContent = 'Copy Discord Handle';
          if (modalDiscordVal) modalDiscordVal.textContent = `Discord: ${handle}`;
          if (modalDiscordIcon) modalDiscordIcon.textContent = '📋';
        }, 2200);

      } catch (err) {
        showMicroToast(`Discord: ${handle}`);
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal && videoModal.classList.contains('is-open')) {
        closeVideoModal();
      }
      if (contactModal && contactModal.classList.contains('is-open')) {
        closeContactModal();
      }
    }
  });

  // ==========================================================================
  // 6. CORE CAPABILITIES INTERACTIVE ACCORDION
  // ==========================================================================
  const accordionPanels = document.querySelectorAll('.accordion-panel');

  accordionPanels.forEach((panel) => {
    const header = panel.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = panel.classList.contains('active');

      // Collapse all panels
      accordionPanels.forEach(p => p.classList.remove('active'));

      // If it wasn't already active, expand it
      if (!isActive) {
        panel.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 7. ONE-CLICK DISCORD CLIPBOARD COPY WITH 2-SECOND FEEDBACK
  // ==========================================================================
  const discordCopyBtn = document.getElementById('discordCopyBtn');
  const discordBtnText = document.getElementById('discordBtnText');
  const toastNotification = document.getElementById('toastNotification');
  let discordTimeout = null;
  let toastTimeout = null;

  function showMicroToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 2400);
  }

  if (discordCopyBtn) {
    discordCopyBtn.addEventListener('click', async () => {
      const handle = discordCopyBtn.getAttribute('data-handle') || '3_volt_3';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(handle);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = handle;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        discordCopyBtn.classList.add('copied-active');
        if (discordBtnText) discordBtnText.textContent = `Copied: ${handle}! ✓`;
        showMicroToast(`Discord handle copied: ${handle} ✓`);

        clearTimeout(discordTimeout);
        discordTimeout = setTimeout(() => {
          discordCopyBtn.classList.remove('copied-active');
          if (discordBtnText) discordBtnText.textContent = `Discord: ${handle}`;
        }, 2000);

      } catch (err) {
        showMicroToast(`Discord: ${handle}`);
      }
    });
  }

  // ==========================================================================
  // 8. INTERACTIVE 3D PERSPECTIVE CARD TILT & CURSOR SPOTLIGHT
  // ==========================================================================
  const allTiltCards = document.querySelectorAll('.work-glass-card, .channel-glass-card');
  allTiltCards.forEach(card => {
    let cardRect = null;
    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    function onMouseEnter() {
      cardRect = card.getBoundingClientRect();
      // Remove transform transition while actively tracking to prevent CSS-JS latency conflict
      card.style.transition = 'border-color 0.3s ease, box-shadow 0.35s ease';
    }

    function onMouseMove(e) {
      if (!cardRect) cardRect = card.getBoundingClientRect();
      mouseX = e.clientX - cardRect.left;
      mouseY = e.clientY - cardRect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    }

    function updateTilt() {
      rafId = null;
      if (!cardRect) return;

      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      const rotateX = ((mouseY - centerY) / centerY) * -4.5;
      const rotateY = ((mouseX - centerX) / centerX) * 4.5;

      card.style.setProperty('--mouse-x', `${mouseX.toFixed(1)}px`);
      card.style.setProperty('--mouse-y', `${mouseY.toFixed(1)}px`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 0)`;
    }

    function onMouseLeave() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      cardRect = null;
      // Re-enable smooth transition for soft spring return
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    }

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });

  // ==========================================================================
  // 9. DYNAMIC CHANNEL JUMP TO EDIT PROJECT WITH HIGHLIGHT PULSE
  // ==========================================================================
  const jumpButtons = document.querySelectorAll('[data-jump-project]');
  jumpButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-jump-project');
      const targetCard = document.querySelector(`.work-glass-card[data-project="${projId}"]`);
      if (!targetCard) return;

      // Ensure the card is visible (if hidden by active category tab)
      if (targetCard.classList.contains('is-hidden')) {
        const allTabBtn = document.querySelector('.filter-tab-btn[data-tab="all"]');
        if (allTabBtn) allTabBtn.click();
      }

      // Smooth scroll to project card
      if (lenis) {
        lenis.scrollTo(targetCard, { offset: -90, duration: 1.1 });
      } else {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Add electric cyan pulse highlight
      targetCard.classList.remove('is-project-highlighted');
      void targetCard.offsetWidth; // Force reflow
      targetCard.classList.add('is-project-highlighted');
      setTimeout(() => {
        targetCard.classList.remove('is-project-highlighted');
      }, 2500);

      const titleEl = targetCard.querySelector('.card-title-text');
      const projectTitle = titleEl ? titleEl.textContent : 'Project Edit';
      showMicroToast(`Viewing Showcase: ${projectTitle} ↓`);
    });
  });

  // ==========================================================================
  // 10. KINETIC WORD & CHARACTER ASSEMBLY ENGINE ("الكلمات تتكون")
  // ==========================================================================
  const CIPHER_GLYPHS = '01∆⚡∇✦⬡XVLT97#/_<>░▒';

  function runCipherAssembly(el, targetText = null, duration = 480) {
    if (!el) return;
    const finalString = targetText || el.getAttribute('data-cipher-text') || el.textContent.trim();
    if (!finalString) return;

    if (el._isCiphering) return;
    el._isCiphering = true;

    const startTime = performance.now();
    const len = finalString.length;

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const lockedCount = Math.floor(progress * (len + 1));

      let resultText = '';
      for (let i = 0; i < len; i++) {
        const char = finalString[i];
        if (char === ' ' || char === '\n') {
          resultText += ' ';
        } else if (i < lockedCount) {
          resultText += char;
        } else {
          resultText += CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
        }
      }

      el.textContent = resultText;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = finalString;
        el.classList.add('cipher-locked-flash');
        setTimeout(() => el.classList.remove('cipher-locked-flash'), 350);
        el._isCiphering = false;
      }
    }

    requestAnimationFrame(frame);
  }

  // Heading Word Assemble (Staggered 3D assembly + Cyber Cipher)
  const headingsToAssemble = document.querySelectorAll(
    '.hero-glossy-headline, .channels-section-heading, .section-clean-title, .capabilities-heading, .hub-main-title'
  );

  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const heading = entry.target;
        headingObserver.unobserve(heading);
        assembleHeadingWords(heading);
      }
    });
  }, { threshold: 0.15 });

  function assembleHeadingWords(headingEl) {
    if (!headingEl || headingEl._hasWordAssembled) return;
    headingEl._hasWordAssembled = true;

    const targetSpan = headingEl.querySelector('.chrome-metallic-heading') || headingEl;
    const fullText = targetSpan.textContent.trim();
    const words = fullText.split(/\s+/);
    if (!words.length) return;

    targetSpan.innerHTML = '';
    const wordTokens = [];

    words.forEach((w, idx) => {
      const span = document.createElement('span');
      span.className = 'word-assemble-token';
      span.textContent = w;
      span.style.transitionDelay = `${idx * 55}ms`;
      targetSpan.appendChild(span);

      if (idx < words.length - 1) {
        targetSpan.appendChild(document.createTextNode(' '));
      }
      wordTokens.push(span);
    });

    requestAnimationFrame(() => {
      wordTokens.forEach(t => t.classList.add('is-token-assembled'));
      setTimeout(() => {
        runCipherAssembly(targetSpan, fullText, 550);
      }, 100);
    });

    headingEl.addEventListener('mouseenter', () => {
      runCipherAssembly(targetSpan, fullText, 400);
    });
  }

  headingsToAssemble.forEach(h => headingObserver.observe(h));

  // Direct Telemetry numbers cipher assemble
  const cipherElements = document.querySelectorAll('[data-cipher-text]');
  const cipherObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        cipherObserver.unobserve(el);
        const delay = parseInt(el.getAttribute('data-cipher-delay') || '0', 10);
        setTimeout(() => {
          runCipherAssembly(el);
        }, delay);
      }
    });
  }, { threshold: 0.25 });

  cipherElements.forEach((el, index) => {
    el.setAttribute('data-cipher-delay', `${index * 80}`);
    cipherObserver.observe(el);
    const pill = el.closest('.telemetry-pill');
    if (pill) {
      pill.addEventListener('mouseenter', () => {
        runCipherAssembly(el);
      });
    }
  });

  // Enable quick cipher assemble on project card titles & creator names on hover
  document.querySelectorAll('.channel-creator-name, .card-title-text').forEach(title => {
    title.addEventListener('mouseenter', () => {
      runCipherAssembly(title, title.textContent.trim(), 400);
    });
  });

  // ==========================================================================
  // 11. KINETIC SHAPE & CONTAINER ASSEMBLY ENGINE ("الاشكال تتكون")
  // ==========================================================================
  const shapeTargets = document.querySelectorAll(
    '.channel-glass-card, .work-glass-card, .channels-telemetry-strip, .segmented-filter-bar, .metadata-3col-row, .accordion-panel, .hub-actions-dock'
  );

  shapeTargets.forEach((card) => {
    card.classList.add('shape-assemble-target');

    // Inject 4 corner brackets
    const brackets = ['bracket-tl', 'bracket-tr', 'bracket-bl', 'bracket-br'];
    brackets.forEach(bClass => {
      const b = document.createElement('span');
      b.className = `shape-corner-bracket ${bClass}`;
      card.appendChild(b);
    });
  });

  const shapeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        shapeObserver.unobserve(target);
        if (!target.classList.contains('is-shape-assembled')) {
          target.classList.add('is-shape-assembling');
          const siblings = Array.from(target.parentNode ? target.parentNode.children : []);
          const idx = siblings.indexOf(target);
          const delay = Math.max(0, idx) * 60;

          setTimeout(() => {
            target.classList.add('is-shape-assembled');
            setTimeout(() => {
              target.classList.remove('is-shape-assembling');
            }, 750);
          }, delay);
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  shapeTargets.forEach(card => shapeObserver.observe(card));

});
