import React, { useState, useEffect } from 'react';
import { Heart, Mail, Camera, Sparkles, Music, Gift } from 'lucide-react';

export default function AnniversaryWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [openReason, setOpenReason] = useState(null);
  const [openMessageWall, setOpenMessageWall] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openPromises, setOpenPromises] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [timeTogether, setTimeTogether] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [quizAnswers, setQuizAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('quizAnswers');
      return saved ? JSON.parse(saved) : { q1: '', q2: '', q3: '', q4: '', q5: '' };
    } catch {
      return { q1: '', q2: '', q3: '', q4: '', q5: '' };
    }
  });
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const allAnswered = Object.values(quizAnswers).every((answer) => answer.trim() !== '');

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
  }, [quizAnswers]);

  useEffect(() => {
    if (!unlocked) return;
    setVisiblePhotos(0);
    const photoTimer = setInterval(() => {
      setVisiblePhotos((count) => {
        if (count >= galleryImages.length) {
          clearInterval(photoTimer);
          return count;
        }
        return count + 1;
      });
    }, 350);
    return () => clearInterval(photoTimer);
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    const slider = setInterval(() => {
      setCurrentPhoto((photo) => (photo + 1) % galleryImages.length);
    }, 2200);
    return () => clearInterval(slider);
  }, [unlocked]);

  useEffect(() => {
    const start = new Date('May 31, 2025 00:00:00').getTime();
    const timer = setInterval(() => {
      const diff = Date.now() - start;
      setTimeTogether({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pressKey = (key) => {
    if (code.length < 4) setCode(code + key);
  };

  const deleteKey = () => setCode(code.slice(0, -1));
  const clearCode = () => setCode('');

  const unlockLove = () => {
    if (code === '3105') {
      setUnlocked(true);
      setMessage('Unlocked ❤️');
    } else {
      setMessage('Wrong Passcode ❌');
    }
  };

  const sendQuizAnswers = async () => {
    if (!allAnswered) {
      setQuizError('Not answered ❌ Please answer all 5 questions before saving.');
      return;
    }

    setQuizError('Sending your answers... 💌');

    try {
      const response = await fetch('https://formspree.io/f/mpqnkrbl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          subject: 'Memory Quiz Answers ❤️',
          email: 'olivecacii@gmail.com',
          q1_first_impression: quizAnswers.q1,
          q2_one_moment: quizAnswers.q2,
          q3_cutest_habit: quizAnswers.q3,
          q4_i_love_you_more: quizAnswers.q4,
          q5_special_message: quizAnswers.q5,
          message: `Memory Quiz Answers ❤️

1. What was my first impression of you?
${quizAnswers.q1}

2. Which moment made you realize I’m the one?
${quizAnswers.q2}

3. What’s my cutest habit according to you?
${quizAnswers.q3}

4. Who says “I love you” more?
${quizAnswers.q4}

5. Any special message for me?
${quizAnswers.q5}`
        })
      });

      if (response.ok) {
        setQuizError('Saved and sent successfully ❤️');
      } else {
        setQuizError('Could not send right now. Please try again 💌');
      }
    } catch (error) {
      setQuizError('Network error. Please try again 💌');
    }
  };

  const timeline = [
    'First meeting 🥹 — on 28 May at exam centre',
    'First text/call 📱 — 15 May',
    'First date 🍽️ — on 29 May to the movie',
    'First “I love you” ❤️ — 7 June by you, my kuchu-puchu',
    'Favorite trip ✈️ — to Amritsar',
    'Anniversary day 🎉 — 31 May'
  ];

  const reasons = ['Your smile 😊', 'Your patience 🤍', 'Your silly jokes 😂', 'How safe you make me feel 🫶'];
  const promises = ['I promise to annoy you forever 😄', 'I promise to love you endlessly ❤️'];
  const galleryImages = [
    'https://i.ibb.co/hFPbwCsJ/Whats-App-Image-2026-05-26-at-11-52-27-PM.jpg',
    'https://i.ibb.co/svDppHDM/Whats-App-Image-2026-05-26-at-11-52-28-PM-1.jpg',
    'https://i.ibb.co/60RHLRz9/Whats-App-Image-2026-05-26-at-11-52-28-PM.jpg',
    'https://i.ibb.co/JRJknHxm/Whats-App-Image-2026-05-26-at-11-52-30-PM-1.jpg',
    'https://i.ibb.co/Tx4FdXzm/Whats-App-Image-2026-05-26-at-11-52-30-PM.jpg',
    'https://i.ibb.co/MxpTPRHd/Whats-App-Image-2026-05-26-at-11-52-31-PM-1.jpg',
    'https://i.ibb.co/hx7kcZRn/Whats-App-Image-2026-05-26-at-11-52-31-PM.jpg',
    'https://i.ibb.co/xKRHkpTQ/Whats-App-Image-2026-05-26-at-11-56-34-PM-1.jpg',
    'https://i.ibb.co/wFJB4y52/Whats-App-Image-2026-05-26-at-11-56-34-PM.jpg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b0005] via-[#5b0a12] to-[#a1121f] text-white p-6 relative overflow-hidden font-[Comic_Sans_MS]">
      <div className="absolute top-8 left-8 bg-[#8b0015]/90 rotate-[-8deg] p-5 rounded-md shadow-lg text-sm text-white">you + me<br/>= ♡</div>
      <div className="absolute top-10 right-10 bg-[#8f1823]/80 rotate-[7deg] p-5 rounded-md shadow-lg text-sm max-w-[170px]">Every love story is beautiful, but ours is my favorite ♡</div>
      <div className="absolute top-[480px] left-8 text-5xl opacity-40 rotate-12">🌸</div>
      <div className="absolute top-[900px] right-6 text-5xl opacity-50">🧸</div>
      <div className="absolute bottom-40 left-10 text-4xl opacity-50">💗</div>
      <div className="absolute bottom-16 right-10 text-5xl opacity-50">🎀</div>

      <div className="absolute top-32 left-20 text-5xl rotate-[-12deg] opacity-80">🐻💗🐰</div>
      <div className="absolute top-52 right-24 text-4xl rotate-12 opacity-70">✨💌✨</div>
      <div className="absolute top-[700px] left-16 text-5xl opacity-70">🌸🐣</div>
      <div className="absolute top-[1100px] right-12 text-6xl opacity-70 rotate-6">🧸💞</div>
      <div className="absolute bottom-[900px] left-10 text-5xl opacity-70">🐰🎀</div>
      <div className="absolute bottom-[650px] right-16 text-4xl opacity-70 rotate-[-10deg]">💗✨🌷</div>
      <div className="absolute bottom-[300px] left-20 text-6xl opacity-70">🥺💘</div>
      <div className="absolute bottom-[120px] right-24 text-5xl opacity-70 rotate-12">🐻‍❄️💌</div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,140,0.25),transparent_40%)]"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">❤️</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-bounce">✨</div>
        <div className="absolute top-[35%] left-[15%] text-4xl opacity-20">💌</div>
        <div className="absolute bottom-[25%] right-[10%] text-6xl opacity-20 animate-pulse">🎈</div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-1/4 rotate-12 text-6xl">♡</div>
        <div className="absolute top-1/3 right-1/4 -rotate-12 text-5xl">✦</div>
        <div className="absolute bottom-1/4 left-1/3 text-6xl">❀</div>
        <div className="absolute bottom-20 right-1/3 rotate-6 text-5xl">♥</div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        <div className="bg-[#8b0015]/95 rounded-[2rem] p-10 text-center shadow-[0_0_40px_rgba\(255,80,110,0.25\)] border-2 border-[#ffb0b8]/40 relative overflow-hidden">
          <div className="absolute top-5 left-8 text-3xl">☆</div><div className="absolute top-7 right-10 text-4xl">♡</div><Heart className="mx-auto mb-3 text-[#c85b6d]" size={52} fill="#f3a5ad" />
          <h1 className="text-5xl md:text-7xl font-black tracking-wide">Happy<br/>1st Anniversary</h1><p className="mt-5 mx-auto bg-[#a41d2d]/50 text-white max-w-xl px-6 py-3 rounded-full rotate-[-1deg]">celebrating 365 days of love, laughter and endless memories together ♡</p>

          <div className="mt-8 w-full max-w-xs mx-auto bg-[#c2183b] text-white rounded-full p-4 text-3xl tracking-[0.5em] font-bold shadow-lg">
            {code ? '•'.repeat(code.length) : '....'}
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mt-5">
            {[1,2,3,4,5,6,7,8,9].map((n) => (
              <button key={n} onClick={() => pressKey(String(n))} className="bg-gradient-to-br from-[#ff4d6d] via-[#c2183b] to-[#7a0019] hover:scale-105 text-white rounded-full h-14 text-2xl font-bold transition-all duration-300 shadow-[0_0_18px_rgba(255,80,120,0.45)] border border-[#ffb0b8]/40 active:scale-95">{n}</button>
            ))}
            <button onClick={clearCode} className="bg-gradient-to-br from-[#ff4d6d] via-[#c2183b] to-[#7a0019] hover:scale-105 text-white rounded-full h-14 text-sm font-bold transition-all duration-300 shadow-[0_0_18px_rgba(255,80,120,0.45)] border border-[#ffb0b8]/40 active:scale-95">Clear</button>
            <button onClick={() => pressKey('0')} className="bg-gradient-to-br from-[#ff4d6d] via-[#c2183b] to-[#7a0019] hover:scale-105 text-white rounded-full h-14 text-2xl font-bold transition-all duration-300 shadow-[0_0_18px_rgba(255,80,120,0.45)] border border-[#ffb0b8]/40 active:scale-95">0</button>
            <button onClick={deleteKey} className="bg-gradient-to-br from-[#ff4d6d] via-[#c2183b] to-[#7a0019] hover:scale-105 text-white rounded-full h-14 text-xl font-bold transition-all duration-300 shadow-[0_0_18px_rgba(255,80,120,0.45)] border border-[#ffb0b8]/40 active:scale-95">⌫</button>
          </div>

          <button onClick={unlockLove} className="mt-5 bg-[#c2183b] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg">Unlock ❤️</button>
          <div className="mt-4 text-lg font-semibold">{message}</div>
        </div>

        {unlocked && (
          <>
            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] text-center border-2 border-[#ffb0b8]/40 relative overflow-hidden">
              <div className="absolute top-4 left-5 text-4xl opacity-70">🎀</div>
              <div className="absolute bottom-4 right-5 text-4xl opacity-70">💖</div>
              <h2 className="text-3xl font-bold mb-4">365 days of love, laughter & memories ❤️</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#c2183b]/35 p-4 rounded-2xl"><div className="text-3xl font-bold">{timeTogether.d}</div><div>Days</div></div>
                <div className="bg-[#c2183b]/35 p-4 rounded-2xl"><div className="text-3xl font-bold">{timeTogether.h}</div><div>Hours</div></div>
                <div className="bg-[#c2183b]/35 p-4 rounded-2xl"><div className="text-3xl font-bold">{timeTogether.m}</div><div>Minutes</div></div>
                <div className="bg-[#c2183b]/35 p-4 rounded-2xl"><div className="text-3xl font-bold">{timeTogether.s}</div><div>Seconds</div></div>
              </div>
            </div>

            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] border-2 border-[#ffb0b8]/40 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-3xl opacity-60">🌷</div>
              <div className="absolute bottom-4 left-5 text-3xl opacity-60">✨</div>
              <h2 className="text-3xl font-bold mb-4 flex gap-2 items-center"><Sparkles /> Our Love Story</h2>
              <div className="space-y-3">
                {timeline.map((t,i)=><div key={i} className="bg-[#c2183b]/35 p-4 rounded-2xl hover:scale-[1.02] transition">{t}</div>)}
              </div>
            </div>

            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] border-2 border-[#ffb0b8]/40 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-3xl opacity-60">🌷</div>
              <div className="absolute bottom-4 left-5 text-3xl opacity-60">✨</div>
              <h2 className="text-3xl font-bold mb-4">Reasons Why I Love You ❤️</h2>
              <div className="space-y-4">
                {reasons.map((r, i) => (
                  <div key={i} className="bg-[#c2183b]/35 rounded-2xl overflow-hidden">
                    <button onClick={() => setOpenReason(openReason === i ? null : i)} className="w-full text-left p-4 font-semibold flex justify-between items-center">
                      <span>Reason {i + 1} 💌</span><span>{openReason === i ? '−' : '+'}</span>
                    </button>
                    {openReason === i && <div className="px-4 pb-4 text-white">{r}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => setShowLetter(true)} className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] cursor-pointer hover:scale-[1.02] transition border-2 border-[#ffb0b8]/40">
              <Mail className="mb-3" />
              <h2 className="text-3xl font-bold">Love Letter 💌</h2>
              <p>Tap to read</p>
            </div>

            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] border-2 border-[#ffb0b8]/40 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-3xl opacity-60">🌷</div>
              <div className="absolute bottom-4 left-5 text-3xl opacity-60">✨</div>
              <Music className="mb-3" />
              <h2 className="text-3xl font-bold">Songs That Are Ours 🎵</h2>
              <div className="mt-4 space-y-4">
                <div className="bg-[#c2183b]/35 rounded-2xl p-5 border border-[#ffb0b8]/30 shadow-lg">
                  <p className="text-2xl font-bold">🎵 I Like You So Much, You'll Know It</p>
                  <p className="mt-2 text-white/90">by Ysabelle Cuevas & Awi Rafael 💖</p>

                  <a
                    href="https://open.spotify.com/track/3VFMHnXNWGPq9HhEG2ALPk?si=12UEIDqGThC4aPoeDYPXxw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-[#1DB954] hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(29,185,84,0.35)]"
                  >
                    Play Song on Spotify 💚
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#8b0015] backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_40px_rgba\(255,80,110,0.25\)] border-2 border-[#ffb0b8]/40 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-4 right-5 text-4xl opacity-60">💌</div>
              <button onClick={() => setOpenMessageWall(!openMessageWall)} className="w-full flex justify-between items-center text-3xl font-bold">
                <span>💌 Message Wall</span><span className={`text-5xl transition-transform duration-500 ${openMessageWall ? 'rotate-45 text-white' : 'rotate-0 text-white'}`}>+</span>
              </button>
              {openMessageWall && (
                <div className="mt-6 space-y-4">
                  <div className="bg-[#c2183b]/35 rounded-2xl p-4 italic text-white shadow-lg">“Still choosing you every day.” ❤️</div>
                  <div className="bg-[#c2183b]/35 rounded-2xl p-4 italic text-white shadow-lg">“Forever starts with us.” ✨</div>
                </div>
              )}
            </div>

            <div className="bg-[#8b0015] backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_40px_rgba\(255,80,110,0.25\)] border-2 border-[#ffb0b8]/40 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-4 left-5 text-4xl opacity-60">🎯💞</div>
              <button onClick={() => setOpenQuiz(!openQuiz)} className="w-full flex justify-between items-center text-3xl font-bold">
                <span>🎯 Memory Quiz</span><span className={`text-5xl transition-transform duration-500 ${openQuiz ? 'rotate-45 text-white' : 'rotate-0 text-white'}`}>+</span>
              </button>
              {openQuiz && (
                <div className="mt-6 space-y-5">
                  {[
                    ['q1', 'What was my first impression of you? 💭', 'Type your answer here... ✨'],
                    ['q2', 'Which moment made you realize I’m the one? 💘', 'Type your answer here... 💌'],
                    ['q3', 'What’s my cutest habit according to you? 🥹', 'Type your answer here... 🌸'],
                    ['q4', 'Who says “I love you” more? ❤️', 'Type your answer here... 💞']
                  ].map(([key, question, placeholder]) => (
                    <div key={key} className="bg-[#c2183b]/35 p-5 rounded-2xl shadow-lg space-y-3">
                      <p>❓ {question}</p>
                      <input
                        type="text"
                        value={quizAnswers[key]}
                        onChange={(e)=>setQuizAnswers({...quizAnswers, [key]: e.target.value})}
                        placeholder={placeholder}
                        className="w-full p-3 rounded-xl bg-[#ffffff10] border-2 border-[#ffb0b8]/40 placeholder-[#ffd0d6] text-white outline-none"
                      />
                    </div>
                  ))}
                  <div className="bg-[#c2183b]/35 p-5 rounded-2xl shadow-lg space-y-3">
                    <p>❓ Any special message for me? ✨</p>
                    <textarea
                      value={quizAnswers.q5}
                      onChange={(e)=>setQuizAnswers({...quizAnswers, q5: e.target.value})}
                      placeholder="Write something cute here... 💖"
                      className="w-full p-3 rounded-xl bg-[#ffffff10] border-2 border-[#ffb0b8]/40 placeholder-[#ffd0d6] text-white outline-none min-h-[120px]"
                    />
                  </div>
                  {quizError && <p className="text-yellow-100 font-semibold">{quizError}</p>}
                  {allAnswered ? (
                    <button onClick={sendQuizAnswers} className="w-full bg-[#c2183b] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition">Save your answers 💌</button>
                  ) : (
                    <p className="text-white font-semibold">Not answered ❌ Fill all 5 answers to save.</p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-[#8b0015] backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_40px_rgba\(255,80,110,0.25\)] border-2 border-[#ffb0b8]/40 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-4xl opacity-60">🤍🧸</div>
              <button onClick={() => setOpenPromises(!openPromises)} className="w-full flex justify-between items-center text-3xl font-bold">
                <span className="flex items-center gap-2"><Gift /> Promises 🤍</span><span className={`text-5xl transition-transform duration-500 ${openPromises ? 'rotate-45 text-white' : 'rotate-0 text-white'}`}>+</span>
              </button>
              {openPromises && (
                <div className="mt-6 space-y-4">
                  {promises.map((p,i)=><div key={i} className="bg-[#c2183b]/35 rounded-2xl p-4 shadow-lg hover:scale-105 transition">{p}</div>)}
                </div>
              )}
            </div>

            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] text-center border-2 border-[#ffb0b8]/40 hover:scale-[1.02] transition-all duration-500">
              <button onClick={()=>setShowSurprise(!showSurprise)} className="bg-[#c2183b] text-white px-8 py-3 rounded-full font-bold hover:scale-110 transition">Click for a surprise 💌</button>
              {showSurprise && (
                <div className="mt-6 bg-[#c2183b]/35 rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl font-semibold text-white">You are my favorite person ❤️</p>
                  <p className="mt-2 text-white">And I’ll keep choosing you in every lifetime ✨</p>
                </div>
              )}
            </div>

            <div className="bg-[#8b0015]/95 rounded-[2rem] p-8 shadow-[0_0_30px_rgba\(255,80,110,0.2\)] relative overflow-hidden border-2 border-[#ffb0b8]/40">
              <div className="absolute top-4 right-6 text-4xl opacity-30">📸</div>
              <div className="absolute bottom-4 left-6 text-3xl opacity-20">💞</div>
              <Camera className="mb-3" />
              <h2 className="text-3xl font-bold">Photo Gallery 📸</h2>
              <p className="text-white mt-2">A collection of our cutest moments 💖</p>

              <div className="mt-6 max-w-xl mx-auto bg-[#c2183b]/35 p-3 rounded-[2rem] shadow-[0_0_40px_rgba\(255,80,110,0.25\)] relative overflow-hidden">
                <div className="absolute top-3 left-4 text-3xl z-10">🎀</div>
                <div className="absolute top-3 right-4 text-3xl z-10">💗</div>
                <img
                  key={currentPhoto}
                  src={galleryImages[currentPhoto]}
                  alt="featured memory"
                  className="w-full h-[430px] object-cover rounded-[1.5rem] transition-all duration-700 ease-out animate-none"
                  style={{ animation: 'cuteSlide 0.8s ease-out' }}
                />
                <p className="mt-3 text-center text-white font-semibold">Memory {currentPhoto + 1} / {galleryImages.length} ♡</p>
              </div>

              <style>{`
                @keyframes cuteSlide {
                  0% { opacity: 0; transform: translateX(45px) rotate(3deg) scale(0.94); }
                  60% { opacity: 1; transform: translateX(-8px) rotate(-1deg) scale(1.02); }
                  100% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
                }
              `}</style>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {galleryImages.map((src, i) => (
                  <div
                    key={i}
                    className={`bg-[#c2183b]/35 p-2 rounded-[2rem] shadow-[0_0_30px_rgba\(255,80,110,0.2\)] hover:scale-105 transition-all duration-700 relative transform ${i < visiblePhotos ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'} ${i === currentPhoto ? 'ring-4 ring-[#c85b6d] scale-105' : ''} ${i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'} hover:rotate-0`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="absolute -top-2 -right-2 text-2xl">💗</div>
                    <img src={src} alt={`memory-${i + 1}`} className="w-full h-[350px] object-cover rounded-[1.5rem]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-4xl font-bold py-10 bg-[#8b0015]/90/70 rounded-[2rem] shadow-[0_0_30px_rgba\(255,80,110,0.2\)] relative overflow-hidden">
              <div className="absolute left-8 top-4 text-5xl opacity-70">🐰</div>
              <div className="absolute right-8 bottom-4 text-5xl opacity-70">🧸</div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-3xl opacity-50">✨💖✨</div>
              1 year down, forever to go ❤️
            </div>
          </>
        )}
      </div>

      {showLetter && (
        <div className="fixed inset-0 bg-[#2a0005]/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-[#c2183b] via-[#8b0015] to-[#5b0a12] text-white rounded-3xl max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-[0_0_50px_rgba(255,80,110,0.35)] border-4 border-[#ffb0b8]/50 relative overflow-hidden">
            <div className="absolute top-4 left-6 text-4xl opacity-30">💌</div>
            <div className="absolute top-6 right-8 text-3xl opacity-30">❤️</div>
            <div className="absolute bottom-6 left-8 text-4xl opacity-20">🌸</div>
            <div className="absolute bottom-4 right-6 text-4xl opacity-20">✨</div>
            <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">💌 My Love</h2>
            <div className="space-y-5 leading-relaxed text-lg text-white bg-[#ffffff10] backdrop-blur-sm p-6 rounded-[2rem] border border-[#ffb0b8]/20">
              <p><span className="font-bold text-white">My love,</span> I don’t think I tell you this enough, but <span className="font-semibold text-white">you truly mean the world to me.</span> Somewhere between our silly conversations, random fights, endless teasing, and all our little moments, you became my favorite person—<span className="italic text-white">my comfort, my safe place, my home.</span> ❤️</p>
              <p>There’s something about you that makes everything feel lighter. Your smile, your patience, the way you calm me down, and the way you handle all my chaos so gently—it means <span className="font-semibold text-white">more to me than you’ll ever know.</span> 🥹</p>
              <p>Thank you for dealing with all my <span className="italic">badmashi</span>, my endless <span className="italic">nakhre</span>, and my “angry little bird” side that’s always ready to fight. But despite all that, <span className="font-semibold text-white">you stay. You listen. You understand. You love me anyway.</span> ❤️</p>
              <p>You’ve seen my difficult sides, my messy moods, my overthinking, my unnecessary fights—and instead of walking away, <span className="font-semibold text-white">you held my hand tighter.</span> Thank you for loving me even on the days when I’m hardest to love. 🤍</p>
              <p>Grateful that out of everyone, <span className="font-bold italic text-white">tumne mujhe choose kiya.</span> 💘</p>
              <p>Please know this—<span className="font-semibold text-white">my love for you is real, deep, and constant.</span> ♾️</p>
              <p><span className="font-semibold text-white">At the end of every day, through every mood and every version of me, my heart will always choose you.</span> 💞</p>
              <p className="text-right font-bold text-white">Yours, always—your favorite little troublemaker ❤️</p>
            </div>
            <button onClick={() => setShowLetter(false)} className="mt-8 bg-gradient-to-r from-[#ff4d6d] to-[#8b0015] hover:scale-[1.02] transition-all duration-300 text-white px-6 py-3 rounded-full w-full font-semibold shadow-[0_0_20px_rgba(255,80,120,0.35)]">Close 💌</button>
          </div>
        </div>
      )}
    </div>
  );
}
