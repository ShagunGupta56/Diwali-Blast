import { toBlob } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, VolumeX, Sparkles, Heart, ArrowRight, Flame,
  RotateCcw, Gift, Share2, WandSparkles
} from "lucide-react";
import "./Home.css";

const FIREWORKS = {
  anar: {
    title: "सुनहरी अनार | Golden Anar",
    subtitle: "सुनहरी चिंगारियों की फुहार | A fountain of golden sparks!",
    icon: "✨",
    sound: "/audio/anar.mp3",
  },
  chakri: {
    title: "रंगीन चकरी | Magic Chakri",
    subtitle: "A colourful whirl of light!",
    icon: "🌀",
    sound: "/audio/chakri.mp3",
  },
  sky: {
    title: "आसमान की आतिशबाज़ी | Sky Shot",
    subtitle: "A magical burst across the sky!",
    icon: "🎆",
    sound: "/audio/sky-shot.mp3",
  },
};

const CARD_TEMPLATES = {
  royal: "/cards/royal.jpg",
  traditional: "/cards/traditional.jpg",
  minimal: "/cards/elegant.jpg",
  vibrant: "/cards/festive.jpg",
};

function Diya({ lit, onClick }) {
  return (
    <div className={`diya-interaction ${lit ? "is-lit" : ""}`}>
      <button
        className={`diya-button ${lit ? "diya-lit" : ""}`}
        onClick={onClick}
        disabled={lit}
        aria-label="Light the diya"
      >
        <svg viewBox="0 0 260 220" width="260" role="img" aria-label="A traditional diya">
          <defs>
            <linearGradient id="bowlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8B44A" />
              <stop offset="55%" stopColor="#B84B23" />
              <stop offset="100%" stopColor="#70251F" />
            </linearGradient>
            <radialGradient id="flameGradient">
              <stop offset="0%" stopColor="#FFFDE1" />
              <stop offset="45%" stopColor="#FFD34E" />
              <stop offset="100%" stopColor="#FF721F" />
            </radialGradient>
            <filter id="flameGlow">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>
          {lit && (
            <motion.ellipse
              cx="130" cy="65" rx="65" ry="75" fill="#FFB52E"
              filter="url(#flameGlow)"
              animate={{ opacity: [0.3, 0.8, 0.45, 0.75], rx: [55, 70, 60, 75] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <path d="M130 119 Q128 94 132 82" stroke="#49221C" strokeWidth="7" strokeLinecap="round" fill="none" />
          {lit && (
            <motion.path
              d="M132 87 C92 65 117 27 136 8 C145 35 175 55 145 87 Z"
              fill="url(#flameGradient)"
              initial={{ opacity: 0, scale: 0.05 }}
              animate={{ opacity: [0.6, 1, 0.85, 1], scale: [0.1, 0.65, 1, 1.08, 0.96, 1], rotate: [-4, 3, -2, 4, -3] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{ transformOrigin: "130px 90px" }}
              className="flame-shape"
            />
          )}
          <path d="M35 118 Q130 158 225 118 Q205 197 130 194 Q55 197 35 118Z" fill="url(#bowlGradient)" stroke="#FFD080" strokeWidth="4" />
          <path d="M35 118 Q130 152 225 118" fill="none" stroke="#FFE1A1" strokeWidth="7" />
          {[65, 90, 115, 140, 165, 190].map((x) => (
            <circle key={x} cx={x} cy={153 + Math.abs(130 - x) * 0.12} r="3" fill="#FFD878" />
          ))}
        </svg>
      </button>
      {lit && (
        <motion.div className="orbit-stars" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
          {Array.from({ length: 12 }).map((_, i) => <span key={i} style={{ "--i": i }}>✦</span>)}
        </motion.div>
      )}
      {!lit && <motion.div className="tap-indicator" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>👆</motion.div>}
    </div>
  );
}

function FireworkShow({ type }) {
  return (
    <div className={`firework-scene scene-${type}`} aria-label={`${FIREWORKS[type].title} animation`}>
      {type === "anar" && (
        <>
          <div className="anar-fountain-glow" />
          <div className="anar-fountain">
            {Array.from({ length: 84 }).map((_, i) => (
              <i key={i} style={{
                "--i": i,
                "--angle": `${-78 + (i / 83) * 156}deg`,
                "--dx": `${Math.round((-1 + 2 * (i / 83)) * (75 + (i % 8) * 16))}px`,
                "--dy": `${-115 - (i % 9) * 19}px`,
                "--delay": `${(i % 14) * 0.045}s`,
              }} />
            ))}
          </div>
          <div className="firework-ground" />
        </>
      )}
      {type === "chakri" && (
        <div className="chakri-stage">
          <div className="chakri-ring ring-one" />
          <div className="chakri-ring ring-two" />
          <div className="chakri-core">✦</div>
          {Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ "--i": i }}>✦</i>)}
        </div>
      )}
      {type === "sky" && (
        <div className="sky-stage">
          <div className="sky-rocket"><span /></div>
          <div className="sky-burst burst-one">
            {Array.from({ length: 44 }).map((_, i) => <i key={i} style={{ "--i": i, "--angle": `${i * 8.18}deg`, "--distance": `${92 + (i % 7) * 11}px` }} />)}
          </div>
          <div className="sky-burst burst-two">
            {Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ "--i": i, "--angle": `${i * 11.25}deg`, "--distance": `${68 + (i % 6) * 10}px` }} />)}
          </div>
          <div className="sky-burst burst-three">
            {Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ "--i": i, "--angle": `${i * 12.86}deg`, "--distance": `${62 + (i % 6) * 9}px` }} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [stage, setStage] = useState("welcome");
  const [sound, setSound] = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const [selectedFirework, setSelectedFirework] = useState("");
  const [igniting, setIgniting] = useState(false);
  const [fireworkDone, setFireworkDone] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("royal");
  const [incomingTemplate, setIncomingTemplate] = useState("royal");
  const [shareMessage, setShareMessage] = useState("");
  const [incomingName, setIncomingName] = useState("");
  const [incomingLoading, setIncomingLoading] = useState(false);
const [incomingError, setIncomingError] = useState("");
  const ambientRef = useRef(null);
  const ignitionRef = useRef(null);
  const celebrationRef = useRef(null);
  const fireworkAudioRef = useRef(null);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const cardImageRef = useRef(null);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get("card");
  const sharedBy = params.get("from");

  const loadSharedCard = async () => {
    if (cardId) {
      setStage("sharedCard");
      setIncomingLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/cards/${encodeURIComponent(cardId)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.card) {
          throw new Error("Card nahi mila.");
        }

        const receivedName =
  data.card.senderName ||
  data.card.sender_name ||
  data.card.sender ||
  "";

setIncomingName(receivedName);
setIncomingTemplate(data.card.template || "royal");
      } catch (error) {
        console.error("Card fetch error:", error);
        setIncomingError("Sorry! Ye Diwali card nahi mil paya.");
      } finally {
        setIncomingLoading(false);
      }

      return;
    }

    // Old links ko bhi support karenge
    if (sharedBy) {
      setIncomingName(sharedBy);
      setIncomingTemplate(params.get("theme") || "royal");
      setStage("sharedCard");
    }
  };

  loadSharedCard();

  return () => clearTimeout(timerRef.current);
}, []);

  // All sounds are generated in-browser, so no extra MP3 downloads are required.
  const playSynthSound = (kind) => {
    if (!sound) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = audioContextRef.current || new AudioContextClass();
    audioContextRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    const noiseBurst = (startAt, duration, volume, highpass = 500, lowpass = 9000) => {
      const count = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, count, ctx.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let i = 0; i < count; i++) {
        const fade = Math.pow(1 - i / count, 1.8);
        samples[i] = (Math.random() * 2 - 1) * fade;
      }
      const source = ctx.createBufferSource();
      const hp = ctx.createBiquadFilter();
      const lp = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      source.buffer = buffer;
      hp.type = "highpass"; hp.frequency.value = highpass;
      lp.type = "lowpass"; lp.frequency.value = lowpass;
      gain.gain.setValueAtTime(0.0001, now + startAt);
      gain.gain.exponentialRampToValueAtTime(volume, now + startAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startAt + duration);
      source.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(ctx.destination);
      source.start(now + startAt); source.stop(now + startAt + duration + 0.02);
    };

    const boom = (startAt = 0, strength = 1) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(105, now + startAt);
      osc.frequency.exponentialRampToValueAtTime(38, now + startAt + 0.42);
      gain.gain.setValueAtTime(0.0001, now + startAt);
      gain.gain.exponentialRampToValueAtTime(0.48 * strength, now + startAt + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startAt + 0.52);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + startAt); osc.stop(now + startAt + 0.55);
      noiseBurst(startAt, 0.22, 0.28 * strength, 90, 1800);
    };

    const ping = (frequency, startAt, duration = 0.22, volume = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now + startAt);
      gain.gain.setValueAtTime(0.0001, now + startAt);
      gain.gain.exponentialRampToValueAtTime(volume, now + startAt + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startAt + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + startAt); osc.stop(now + startAt + duration + 0.02);
    };

    if (kind === "ui") {
      ping(740, 0, 0.12, 0.055);
      ping(990, 0.055, 0.18, 0.045);
    } else if (kind === "diya") {
      ping(660, 0, 0.3, 0.12);
      ping(990, 0.12, 0.5, 0.08);
      noiseBurst(0.03, 0.22, 0.055, 2200, 10000);
    } else if (kind === "celebration") {
      [523, 659, 784, 1046, 1318].forEach((f, i) => ping(f, i * 0.11, 0.55, 0.075));
      noiseBurst(0.1, 0.75, 0.075, 1800, 10000);
      boom(0.16, 0.55);
    } else if (kind === "anar") {
      // A sustained bright fountain with many sharp crackles and little pops.
      noiseBurst(0.0, 2.5, 0.16, 1300, 11000);
      noiseBurst(0.12, 2.1, 0.10, 2600, 12000);
      for (let i = 0; i < 28; i++) {
        const t = 0.08 + i * 0.082 + Math.random() * 0.035;
        noiseBurst(t, 0.045 + Math.random() * 0.055, 0.11 + Math.random() * 0.08, 1800, 12000);
        if (i % 3 === 0) ping(1200 + Math.random() * 1000, t, 0.08, 0.035);
      }
      boom(0.02, 0.42);
    } else if (kind === "chakri") {
      // Fast rising spinning buzz plus crackling ticks.
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const wobble = ctx.createOscillator();
      const wobbleGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 1.9);
      wobble.frequency.value = 16;
      wobbleGain.gain.value = 115;
      wobble.connect(wobbleGain); wobbleGain.connect(osc.frequency);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.12);
      gain.gain.linearRampToValueAtTime(0.0001, now + 2.1);
      osc.connect(gain); gain.connect(ctx.destination);
      wobble.start(now); osc.start(now); wobble.stop(now + 2.15); osc.stop(now + 2.15);
      for (let i = 0; i < 18; i++) noiseBurst(i * 0.105, 0.035, 0.065, 2500, 12000);
    } else if (kind === "sky") {
      // Ascending whistle, then layered low thump and bright aerial crackles.
      const whistle = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistle.type = "sine";
      whistle.frequency.setValueAtTime(260, now);
      whistle.frequency.exponentialRampToValueAtTime(1500, now + 1.05);
      whistleGain.gain.setValueAtTime(0.0001, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.12, now + 0.12);
      whistleGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.08);
      whistle.connect(whistleGain); whistleGain.connect(ctx.destination);
      whistle.start(now); whistle.stop(now + 1.1);
      boom(1.08, 1);
      boom(1.22, 0.62);
      for (let i = 0; i < 34; i++) {
        const t = 1.12 + Math.random() * 0.8;
        noiseBurst(t, 0.045 + Math.random() * 0.09, 0.12 + Math.random() * 0.1, 1200, 12000);
        if (i % 4 === 0) ping(900 + Math.random() * 1800, t, 0.16, 0.055);
      }
    }
  };

  const handleUiSound = (event) => {
    if (!sound) return;
    const button = event.target.closest("button");
    if (!button || button.disabled || button.dataset.sound === "special") return;
    playSynthSound("ui");
  };

  const playAudio = (audioRef, volume = 0.7) => {
    if (!sound || !audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const startExperience = () => {
    setStage("diya");
    playAudio(ambientRef, 0.25);
  };

  const lightDiya = () => {
    if (stage !== "diya") return;
    setStage("lit");
    playAudio(ignitionRef, 0.8);
    playSynthSound("diya");
    timerRef.current = setTimeout(() => {
      setCelebrating(true);
      playAudio(celebrationRef, 0.7);
      playSynthSound("celebration");
    }, 1800);
  };

  const chooseFirework = (type) => {
    setSelectedFirework(type);
    setIgniting(false);
    setFireworkDone(false);
  };

  const lightFirework = () => {
    if (!selectedFirework || igniting || fireworkDone) return;
    setIgniting(true);
    if (fireworkAudioRef.current) {
      fireworkAudioRef.current.src = FIREWORKS[selectedFirework].sound;
      playAudio(fireworkAudioRef, 0.75);
    }
    playSynthSound(selectedFirework);
    timerRef.current = setTimeout(() => {
      setIgniting(false);
      setFireworkDone(true);
    }, selectedFirework === "sky" ? 2350 : 2100);
  };

  const restartCelebration = () => {
    clearTimeout(timerRef.current);
    setStage("diya");
    setCelebrating(false);
    setSelectedFirework("");
    setIgniting(false);
    setFireworkDone(false);
  };

  const openCardCreator = () => {
    setShareMessage("");
    setStage("card");
  };

  
const createCardInDatabase = async () => {
  const cleanName = senderName.trim();

  if (!cleanName) {
    setShareMessage("पहले अपना नाम लिखें 😊 | Please enter your name first.");
    return null;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senderName: cleanName,
        template: selectedTemplate
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Card save nahi hua");
    }

    return data.card.cardId;

  } catch (error) {
    console.error("Card save error:", error);
    setShareMessage("कार्ड सेव नहीं हो पाया। दोबारा कोशिश करें। | Could not save the card. Please try again.");
    return null;
  }
};



const shareCard = async () => {
  const cleanName = senderName.trim();

  if (!cleanName) {
    setShareMessage("पहले अपना नाम लिखें 😊 | Please enter your name first.");
    return;
  }

  const cardId = await createCardInDatabase();
  if (!cardId) return;

  const shareUrl = new URL(window.location.origin);
  shareUrl.searchParams.set("card", cardId);

  const message = `🪔 शुभ दीपावली! 🪔

इस पावन पर्व पर आपके जीवन में सुख, शांति, प्रेम और समृद्धि के अनगिनत दीप जलें। आपका घर खुशियों और मुस्कान से हमेशा रोशन रहे। ❤️

🎁 आपके लिए दिवाली का खास उपहार! | A Special Diwali Gift For You!

यह छोटा-सा तोहफा मेरी तरफ से आपके लिए...

स्नेह सहित | With Love, ${cleanName}

👇 अपना खास Diwali Gift खोलने के लिए यहाँ क्लिक करें:

🎁 अपना दिवाली उपहार खोलें | Open Your Diwali Gift:

${shareUrl.toString()}

✨ Happy Diwali! ✨`;

  try {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
    setShareMessage("WhatsApp में आपका संदेश तैयार है। भेजने से पहले जाँच लें। ❤️ | Your message is ready in WhatsApp.");
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
      setShareMessage("शेयर नहीं हो पाया। दोबारा कोशिश करें। | Sharing failed. Please try again.");
    }
  }
};



  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    if (!next) {
      [ambientRef, ignitionRef, celebrationRef, fireworkAudioRef].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    } else if (stage !== "welcome" && ambientRef.current) {
      ambientRef.current.play().catch(() => {});
    }
  };

  return (
    <main className="diwali-page" onClickCapture={handleUiSound}>
      <audio ref={ambientRef} src="/audio/diwali-ambience.mp3" loop />
      <audio ref={ignitionRef} src="/audio/diya-light.mp3" />
      <audio ref={celebrationRef} src="/audio/celebration.mp3" />
      <audio ref={fireworkAudioRef} />
      <div className="festive-background">
        <div className="light-string">{Array.from({ length: 15 }).map((_, i) => <span key={i} />)}</div>
        <div className="candle candle-left"><div className="candle-flame" /></div>
        <div className="candle candle-right"><div className="candle-flame" /></div>
        <div className="side-diya left-diya">🪔</div>
        <div className="side-diya right-diya">🪔</div>
        <div className="floating-flower flower-one">✿</div>
        <div className="floating-flower flower-two">✿</div>
        <div className="rangoli"><div className="rangoli-inner">✿</div></div>
      </div>

      <nav className="diwali-nav">
        <div className="brand">🪔 Diwali <b>Blast</b></div>
        <button className="sound-button" onClick={toggleSound} aria-label="Toggle sound">
          {sound ? <Volume2 /> : <VolumeX />}
          <span>{sound ? "आवाज़ चालू | Sound On" : "आवाज़ बंद | Sound Off"}</span>
        </button>
      </nav>

      <section className="celebration-stage">
        <div className="welcome-label"><Sparkles size={16} /> रोशनी और खुशियों का त्योहार | A FESTIVAL OF LIGHTS & HAPPINESS</div>
        <AnimatePresence mode="wait">
          {stage === "welcome" && (
            <motion.div key="welcome" className="stage-content" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h1 className="main-heading">खुशियाँ बाँटें,<br /><span>हर ओर रोशनी फैलाएँ</span></h1>
              <p className="stage-description">इस दिवाली, रोशनी बाँटें, खुशियाँ बाँटें और अपनों के चेहरे पर मुस्कान लाएँ। आपके लिए एक छोटा-सा जादुई अनुभव इंतज़ार कर रहा है! | This Diwali, spread light, happiness and smiles.</p>
              <div className="welcome-art"><div className="art-diya">🪔</div><div className="art-flower">🌼</div><div className="art-sparkle">✨</div></div>
              <button className="gold-button" onClick={startExperience}><Sparkles size={19} /> अपना दीपक जलाएँ | Light Your Diya <ArrowRight size={18} /></button>
              <p className="small-hint">A little light, a lot of happiness ❤️</p>
            </motion.div>
          )}

          {(stage === "diya" || stage === "lit") && (
            <motion.div key="diya" className="stage-content diya-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {!celebrating && <>
                <h2 className="stage-heading">एक छोटा-सा दीप, ढेर सारी खुशियाँ</h2>
                <p className="stage-description">हर रोशनी एक नई उम्मीद लाती है। अपने हाथों से यह दीपक जलाएँ!</p>
              </>}
              <Diya lit={stage === "lit"} onClick={lightDiya} />
              {stage === "diya" && <p className="tap-text">✨ दीपक जलाने के लिए इसे छुएँ | Tap the diya to light it ✨</p>}
              <AnimatePresence>
                {celebrating && (
                  <motion.div className="celebration-message" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="celebration-burst">{Array.from({ length: 20 }).map((_, i) => <span key={i} style={{ "--i": i }}>✦</span>)}</div>
                    <h2 className="main-heading">आपकी रोशनी,<br /><span>आपकी खुशियाँ!</span></h2>
                    <p className="stage-description">यह दिवाली आपके जीवन में ढेर सारी खुशियाँ, शांति, प्रेम और समृद्धि लेकर आए! | May this Diwali bring happiness, peace, love and prosperity.</p>
                    <div className="wish-message"><Heart fill="#ECA34A" /><p>आपकी ज़िंदगी हमेशा खुशियों की रोशनी से जगमगाती रहे!</p><strong>Happy Diwali! 🪔</strong></div>
                    <button className="gold-button" onClick={() => setStage("fireworks")}>🎆 आतिशबाज़ी शुरू करें | Let’s Start the Fireworks! <ArrowRight size={18} /></button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === "fireworks" && (
            <motion.div key="fireworks" className="stage-content fireworks-screen" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="stage-heading">जश्न शुरू करें! | Let the Celebration Begin! 🎉</h2>
              <p className="stage-description">अपनी पसंद की डिजिटल आतिशबाज़ी चुनें और जादुई माचिस से जलाएँ! | Choose your favourite virtual firework.</p>

              {!selectedFirework ? (
                <div className="firework-options">
                  <button className="firework-card" onClick={() => chooseFirework("anar")}><span>🌋</span><strong>सुनहरी अनार | Golden Anar</strong><small>सुनहरी चिंगारियों की फुहार | A fountain of golden sparks</small></button>
                  <button className="firework-card" onClick={() => chooseFirework("chakri")}><span>🌀</span><strong>रंगीन चकरी | Magic Chakri</strong><small>रंग-बिरंगी घूमती रोशनी | A colourful spinning surprise</small></button>
                  <button className="firework-card" onClick={() => chooseFirework("sky")}><span>🚀</span><strong>आसमान की आतिशबाज़ी | Sky Shot</strong><small>आसमान में रोशनी की बौछार | A burst of light in the sky</small></button>
                </div>
              ) : (
                <motion.div className="firework-play-area" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="selected-firework-title">
                    <span>{FIREWORKS[selectedFirework].icon}</span>
                    <div><h3>{FIREWORKS[selectedFirework].title}</h3><p>{FIREWORKS[selectedFirework].subtitle}</p></div>
                  </div>

                  {!fireworkDone ? (
                    <>
                      <div className={`firework-preview ${igniting ? "is-igniting" : ""}`}>
                        <div className={`virtual-firework firework-${selectedFirework}`}>
                          {selectedFirework === "anar" ? "🏺" : selectedFirework === "chakri" ? "🌀" : "🚀"}
                        </div>
                        {igniting && <div className="fuse-sparks">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ "--i": i }}>✦</i>)}</div>}
                        <motion.div className={`matchbox ${igniting ? "matchbox-lighting" : ""}`} animate={igniting ? { x: [0, 90, 145], y: [0, -8, 5], rotate: [0, -12, 5] } : { y: [0, -5, 0] }} transition={igniting ? { duration: 1.35 } : { duration: 1.6, repeat: Infinity }}>
                          <span className="match-head" /> <span className="match-stick" />
                        </motion.div>
                        {igniting && <div className="match-flare">✦</div>}
                      </div>
                      <p className="match-hint">{igniting ? "आपकी डिजिटल आतिशबाज़ी जल रही है... | Lighting your virtual firework..." : "माचिस तैयार है! जलाने के लिए नीचे दबाएँ। | Your matchbox is ready!"}</p>
                      <button className="gold-button light-firework-button" data-sound="special" onClick={lightFirework} disabled={igniting}>
                        <Flame size={20} /> {igniting ? "Lighting..." : "माचिस से जलाएँ | Light with Matchbox!"}
                      </button>
                    </>
                  ) : (
                    <motion.div className="firework-finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <FireworkShow type={selectedFirework} />
                      <h2 className="main-heading"><span>वाह! क्या शानदार जश्न है!</span></h2>
                      <p className="stage-description">आपकी दिवाली रोशनी, रंगों और खुशियों से भर जाए! ✨</p>
                      <div className="firework-actions">
                        <button className="gold-button" onClick={() => chooseFirework("")}><RotateCcw size={18} /> दूसरी आतिशबाज़ी चुनें | Try Another Firework</button>
                        <button className="outline-gold-button" onClick={openCardCreator}><Gift size={18} /> अपना शुभकामना कार्ड बनाएँ | Create My Wish Card</button>
                      </div>
                    </motion.div>
                  )}
                  <button className="text-button" onClick={() => chooseFirework("")}>← Choose a different firework</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {stage === "card" && (
            <motion.div key="card" className="stage-content card-creator" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-icon"><Gift size={34} /></div>
              <h2 className="stage-heading">दिवाली की खुशियाँ अपनों तक पहुँचाएँ 💌</h2>
              <p className="stage-description">अपना नाम लिखें, सुंदर डिज़ाइन चुनें और परिवार व दोस्तों को दिवाली कार्ड भेजें। | Enter your name, choose a design and send a Diwali card.</p>

              <h3 className="template-heading">अपना पसंदीदा डिज़ाइन चुनें | Choose your favourite design</h3>
              <div className="template-gallery">
                <button type="button" className={`template-option ${selectedTemplate === "royal" ? "active" : ""}`} onClick={() => setSelectedTemplate("royal")}>
                  <span className="template-swatch royal-swatch">🪔</span><strong>Royal Gold</strong><small>Purple & gold</small>
                </button>
                <button type="button" className={`template-option ${selectedTemplate === "traditional" ? "active" : ""}`} onClick={() => setSelectedTemplate("traditional")}>
                  <span className="template-swatch traditional-swatch">🌼</span><strong>Traditional</strong><small>Flowers & rangoli</small>
                </button>
                <button type="button" className={`template-option ${selectedTemplate === "minimal" ? "active" : ""}`} onClick={() => setSelectedTemplate("minimal")}>
                  <span className="template-swatch minimal-swatch">✨</span><strong>Elegant</strong><small>Simple & graceful</small>
                </button>
                <button type="button" className={`template-option ${selectedTemplate === "vibrant" ? "active" : ""}`} onClick={() => setSelectedTemplate("vibrant")}>
                  <span className="template-swatch vibrant-swatch">🎆</span><strong>Festive Glow</strong><small>Colourful lights</small>
                </button>
              </div>
              <div ref={cardImageRef} className={`greeting-card-preview image-card template-${selectedTemplate}`}>
                <img src={CARD_TEMPLATES[selectedTemplate]} alt="Diwali card background" className="card-background-image" />
                <div className="card-image-content">
                  <p className="card-eyebrow">🪔 दीपावली की हार्दिक शुभकामनाएँ 🪔</p>
                  <h2>शुभ दीपावली!</h2>
                  <p>आपके और आपके परिवार के लिए ढेर सारी खुशियाँ, प्यार, स्वास्थ्य और समृद्धि की मंगलकामनाएँ!</p>
                  <div className="card-sender">
                       स्नेह सहित | With Love,
                       <strong>
                          {incomingName || "आपका शुभचिंतक"}
                       </strong>
                  </div>
                  <div className="card-gift">🎁 आपके लिए दिवाली का खास उपहार! | A Special Diwali Gift For You!</div>
                  <div className="card-happy">✨ Happy Diwali! ✨</div>
                </div>
              </div>
              <label className="name-label" htmlFor="sender-name">आपका नाम | Your name</label>
              <input id="sender-name" className="name-input" value={senderName} onChange={(e) => { setSenderName(e.target.value); setShareMessage(""); }} placeholder="यहाँ अपना नाम लिखें | Enter your name here..." maxLength={40} />
              <button className="gold-button share-card-button" onClick={shareCard}><Share2 size={19} /> अपनों को भेजें | Send to Friends <ArrowRight size={18} /></button>
              {shareMessage && <p className="share-feedback" role="status">{shareMessage}</p>}
              <p className="card-note">आपके नाम से एक खास कार्ड लिंक बनेगा। इसे अपनों को भेजें; वे लिंक खोलकर आपकी दिवाली शुभकामना देख सकेंगे। | A personalised card link will be created for you to share.</p>
              <button className="text-button" onClick={restartCelebration}>← Celebrate again</button>
            </motion.div>
          )}

          {stage === "sharedCard" && (
            <motion.div key="shared-card" className="stage-content card-creator" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
              <div className="card-icon"><WandSparkles size={36} /></div>
              <h2 className="stage-heading">आपके लिए एक खास शुभकामना! | A Special Wish Just For You!</h2>
              {incomingLoading && (
  <p className="stage-description">
    🪔 Aapka special Diwali gift load ho raha hai...
  </p>
)}

{incomingError && (
  <p className="share-feedback" role="alert">
    {incomingError}
  </p>
)}
            {!incomingLoading && !incomingError && (
              <div className={`greeting-card-preview image-card received-card template-${incomingTemplate}`}>
                <img src={CARD_TEMPLATES[incomingTemplate] || CARD_TEMPLATES.royal} alt="Personalised Diwali card" className="card-background-image" />
                <div className="card-image-content">
                  <p className="card-eyebrow">🪔 दीपावली की हार्दिक शुभकामनाएँ 🪔</p>
                  <h2>शुभ दीपावली!</h2>
                  <p>आपके और आपके परिवार के लिए ढेर सारी खुशियाँ, प्यार, स्वास्थ्य और समृद्धि की मंगलकामनाएँ!</p>
                  <div className="card-sender">स्नेह सहित | With Love,<strong>{incomingName}</strong></div>
                  <div className="card-gift">🎁 आपके लिए दिवाली का खास उपहार! | A Special Diwali Gift For You!</div>
                  <div className="card-happy">✨ Happy Diwali! ✨</div>
                </div>
              </div>
            )}  
              <p className="stage-description">आपको और आपके परिवार को दीपावली की ढेरों शुभकामनाएँ। आपका हर दिन मंगलमय हो! ❤️</p>
              <button className="gold-button" onClick={() => { window.history.replaceState({}, "", window.location.pathname); setStage("welcome"); }}>🎁 अपना दिवाली उपहार खोलें | Open Your Diwali Gift <ArrowRight size={18} /></button>
              <button className="outline-gold-button" onClick={() => { window.history.replaceState({}, "", window.location.pathname); setSenderName(""); setShareMessage(""); setStage("card"); }}>✨ अपना दिवाली कार्ड बनाएँ | Create Your Own Diwali Card</button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="diwali-footer">दुनियाभर में खुशियाँ बाँटने के लिए ❤️ | Made with love to spread happiness around the world.<p>Diwali Blast ✨</p></footer>
    </main>
  );
}

export default Home;
