<template>
  <div class="bg-wrapper" aria-hidden="true">

    <!-- Dot grid -->
    <div class="dot-grid" />

    <!-- Ambient blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <!-- Vignette -->
    <div class="vignette" />

  </div>
</template>

<style scoped>
.bg-wrapper {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ── Dot grid ── */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 50%, transparent 100%);
}

/* ── Blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  will-change: transform;
}

.blob-1 {
  width: 70vw;
  height: 70vw;
  top: -20%;
  right: -15%;
  background: radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%);
  animation: drift1 22s ease-in-out infinite;
}

.blob-2 {
  width: 60vw;
  height: 60vw;
  bottom: -15%;
  left: -10%;
  background: radial-gradient(circle, rgba(185,28,28,0.12) 0%, transparent 70%);
  animation: drift2 28s ease-in-out infinite;
}

.blob-3 {
  width: 40vw;
  height: 40vw;
  top: 40%;
  left: 35%;
  background: radial-gradient(circle, rgba(239,68,68,0.09) 0%, transparent 70%);
  animation: drift3 18s ease-in-out infinite;
}

/* ── Vignette edges ── */
.vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 100% 50% at 50% 0%,   transparent 60%, rgba(9,9,11,0.6) 100%),
    radial-gradient(ellipse 100% 50% at 50% 100%, transparent 60%, rgba(9,9,11,0.6) 100%),
    radial-gradient(ellipse 30% 100% at 0% 50%,   transparent 60%, rgba(9,9,11,0.4) 100%),
    radial-gradient(ellipse 30% 100% at 100% 50%, transparent 60%, rgba(9,9,11,0.4) 100%);
}

/* ── Keyframes ── */
@keyframes drift1 {
  0%,100% { transform: translate(0, 0) scale(1); }
  33%     { transform: translate(-40px, 60px) scale(1.05); }
  66%     { transform: translate(30px, -40px) scale(0.96); }
}

@keyframes drift2 {
  0%,100% { transform: translate(0, 0) scale(1); }
  40%     { transform: translate(50px, -50px) scale(1.08); }
  80%     { transform: translate(-30px, 30px) scale(0.95); }
}

@keyframes drift3 {
  0%,100% { transform: translate(0, 0) scale(1); }
  50%     { transform: translate(-40px, -30px) scale(1.12); }
}
</style>