import React, { useState } from "react";
import { BookOpen, Sparkles, Languages, Shuffle, Award, FileText, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { fancyWordsData, litQuotesData } from "../data/aqdasData";
import { playClick, playSuccess, playNotification } from "../utils/audio";

interface LitDepartmentProps {
  isDarkMode: boolean;
}

export const LitDepartment: React.FC<LitDepartmentProps> = ({ isDarkMode }) => {
  // Dictionary state
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  // Translator state
  const [translatorInput, setTranslatorInput] = useState("");
  const [translatorOutput, setTranslatorOutput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Poetry generator state
  const [poemTopic, setPoemTopic] = useState<"wifi" | "tea" | "pizza" | "alarm">("wifi");
  const [generatedPoem, setGeneratedPoem] = useState<string[]>([]);
  const [isPoetizing, setIsPoetizing] = useState(false);

  // Core predefined skills
  const skills = [
    { title: "Sustained Poetic Elucidation", desc: "Can explain a 4-line poem for 45 minutes straight without taking a breath or drinking water." },
    { title: "Omnipresent Symbolism Detection", desc: "Finds deep tragedy, grief, or socio-economic critique in any household object (including toasters)." },
    { title: "Extreme Sesquipedalianism", desc: "Uses unnecessarily sophisticated words to make simple requests like 'Pass the butter' sound like a treaty." },
    { title: "Involuntary Cinema Critique", desc: "Believes every movie—including standard family comedies—is an allegory for the fall of Rome." },
    { title: "Spontaneous Shakespearean Chanting", desc: "Quotes Hamlet, Macbeth, or Romeo and Juliet at random intervals, usually during breakfast." }
  ];

  // Random word handler
  const drawRandomWord = () => {
    playClick();
    let nextIdx = currentWordIdx;
    while (nextIdx === currentWordIdx) {
      nextIdx = Math.floor(Math.random() * fancyWordsData.length);
    }
    setCurrentWordIdx(nextIdx);
  };

  // Translator handler
  const handleTranslate = () => {
    if (!translatorInput.trim()) return;
    setIsTranslating(true);
    playClick();

    // Funny preset translation rules
    setTimeout(() => {
      const inputLower = translatorInput.toLowerCase();
      let translation = "";

      if (inputLower.includes("hungry") || inputLower.includes("eat") || inputLower.includes("food")) {
        translation = "My fragile corporeal form yearns deeply for nourishment in this cruel, cold, and indifferent universe. The void in my stomach is a direct reflection of the infinite abyss of time.";
      } else if (inputLower.includes("sleep") || inputLower.includes("tired") || inputLower.includes("bed")) {
        translation = "Alas! The heavy velvet curtains of fatigue descend upon my weary brow. I must surrender my consciousness to the sweet, fleeting embrace of Morpheus, escaping this capitalist waking nightmare.";
      } else if (inputLower.includes("homework") || inputLower.includes("study") || inputLower.includes("exam")) {
        translation = "I am being forced to submit my creative intellect to the mechanical, soul-crushing algorithms of standardized evaluation. Each assignment is a heavy shackle bound to my artistic spirit.";
      } else if (inputLower.includes("wi-fi") || inputLower.includes("wifi") || inputLower.includes("internet")) {
        translation = "The invisible, ethereal threads of cosmic data have ruptured! I am cast adrift in a silent, static dark age, disconnected from the collective digital consciousness of humanity.";
      } else if (inputLower.includes("hello") || inputLower.includes("hi") || inputLower.includes("hey")) {
        translation = "Hark! Who goes there, breaching the sacred, quiet sanctuary of my literary isolation? Speak, traveler, and declare thy existential intent!";
      } else {
        // Universal majestic translation
        const dramaticPhrases = [
          "Behold the sheer tragedy of my current circumstance! Hitherto unimagined complex forces conspire to declare that",
          "Alas, the universe humbles me, forcing my tongue to announce that",
          "With extreme intellectual caution and profound metaphorical weight, I am driven to announce:"
        ];
        const tragicSuffixes = [
          "representing the quiet, slow, and absolute downfall of my domestic tranquility.",
          "a tragic motif that will echo throughout the halls of my memory for eternity.",
          "thus subverting the classical paradigms of my daily existence."
        ];
        const randomStart = dramaticPhrases[Math.floor(Math.random() * dramaticPhrases.length)];
        const randomEnd = tragicSuffixes[Math.floor(Math.random() * tragicSuffixes.length)];
        translation = `"${randomStart} '${translatorInput}' — ${randomEnd}"`;
      }

      setTranslatorOutput(translation);
      setIsTranslating(false);
      playNotification();
    }, 800);
  };

  // Select predefined sentences to translate
  const selectPresetText = (txt: string) => {
    setTranslatorInput(txt);
  };

  // Poetry generator handler
  const handleGeneratePoem = () => {
    setIsPoetizing(true);
    playClick();

    setTimeout(() => {
      let stanzas: string[] = [];

      if (poemTopic === "wifi") {
        stanzas = [
          "O, invisible spirit of the modern air,\nWhy hast thou abandoned me to this deep despair?\nThe signal bars, once full and bright as hope,\nAre gone, leaving my browser unable to cope.",
          "The spinning wheel of buffering infinity wails,\nA silent tragedy as our connectivity fails.\nIs it a metaphor for our alienated state?\nOr did my brother simply reset the router too late?",
          "Henceforth I sit in gothic darkness and sigh,\nAsking the indifferent sky: 'Why, Wi-Fi, why?'"
        ];
      } else if (poemTopic === "tea") {
        stanzas = [
          "Steam rises like a ghost from the porcelain brim,\nAs the daylight outside grows cold and dim.\nGreen leaves submerged in boiling torment scream,\nA bitter leaf turned to a warm, consoling dream.",
          "The ceramic mug, warm like a mother's embrace,\nSlowly brings peace back to this frantic place.\nI blow upon the tide, a gentle, soothing breeze,\nAnalyzing the cup, down to the herbal dregs and lees.",
          "With milk or honey, or plain as a philosopher's soul,\nThis cup of Earl Grey is what keeps me whole."
        ];
      } else if (poemTopic === "pizza") {
        stanzas = [
          "The golden crust, a perfect, circular stage,\nWhere molten mozzarella vents its silent rage.\nTriangles of destiny, grease gleaming like gold,\nA medieval feast, too glorious to behold.",
          "Pepperoni discs lie like shields on the field,\nTo the hunger of Aqdas, all cheeses must yield.\nHe lifts a slice, a cheese pull long and deep,\nA culinary ritual before he goes back to sleep.",
          "A masterpiece of dough, tomato, and intense desire,\nBaked to perfection in a brick-lined oven's fire."
        ];
      } else if (poemTopic === "alarm") {
        stanzas = [
          "Hark! The mechanical rooster shrieks in the dark,\nExtinguishing my dream's sweet, divine spark.\nA digital klaxon of absolute physical distress,\nIntruding upon my heavy, blankets-induced rest.",
          "To snooze is human, to sleep through lunch is divine,\nI pull the heavy duvet over this spine of mine.\nLet the world rotate, let the capitalism churn,\nMy deep allegiance to my pillow is my sole concern.",
          "Alas, the alarm screams once again at one PM,\nAnd with a dramatic groan, I rise to face them."
        ];
      }

      setGeneratedPoem(stanzas);
      setIsPoetizing(false);
      playSuccess();
    }, 900);
  };

  return (
    <div className="space-y-12" id="literature-department-section">
      {/* Title Header */}
      <div className="border-b border-slate-100 pb-6">
        <span className="text-xs font-mono text-indigo-600 uppercase tracking-widest flex items-center gap-2 font-bold">
          <BookOpen className="w-4 h-4 text-indigo-500" /> Academic Division
        </span>
        <h1 className="text-4xl font-sans font-black tracking-tight mt-2 text-slate-900">
          The English Literature Department
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          A dedicated space studying Aqdas' official BS in English Literature and his tragic relationship with household objects.
        </p>
      </div>

      {/* Main Grid: Skills + Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Skills */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <Award className="w-5 h-5 text-indigo-500" /> Authorized Academic Skills
          </h2>
          <div className="space-y-3">
            {skills.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex gap-3 transition-all duration-300 hover:translate-x-1 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI Literature analysis */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" /> AI Personality Critique
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Super-computers analyzed Aqdas' BS thesis and concluded the following balance:
            </p>
          </div>

          <div className="space-y-4 my-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-bold text-slate-600">
                <span>Vocabulary & Fancy Word Density</span>
                <span className="text-indigo-600">99%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/40">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "99%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-bold text-slate-600">
                <span>Drafting Unnecessarily Long Essays</span>
                <span className="text-purple-600">100%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/40">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-bold text-slate-600">
                <span>Tragic Overthinking (Of simple memes)</span>
                <span className="text-pink-600">120%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/40">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 font-bold text-slate-600">
                <span>Deciding what to eat under pressure</span>
                <span className="text-amber-600">5%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/40">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 font-medium">
            <strong>Verdict:</strong> Aqdas is mathematically optimized for writing massive paragraphs but will experience extreme cognitive lock if forced to select a pizza topping in under 3 minutes.
          </div>
        </div>
      </div>

      {/* Lit Quotes and Fancy Dictionary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dictionary */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-indigo-600 uppercase font-extrabold">Aqdas' Custom Lexicon</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold font-sans mt-2 text-slate-900">Interactive Fancy Dictionary</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Generating words Aqdas invented to sound highly majestic.</p>

            {/* Current word card */}
            <div className="mt-6 p-5 rounded-2xl border border-slate-100 bg-slate-50/60 shadow-inner">
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-serif font-black text-indigo-700">
                  {fancyWordsData[currentWordIdx].word}
                </h4>
                <span className="text-xs text-slate-400 font-mono italic">
                  /{fancyWordsData[currentWordIdx].pronunciation}/
                </span>
              </div>
              <div className="text-[10px] text-purple-600 font-mono mt-1 font-bold uppercase tracking-wider">
                {fancyWordsData[currentWordIdx].partOfSpeech}
              </div>
              <p className="text-sm text-slate-700 mt-3 italic font-medium">
                "{fancyWordsData[currentWordIdx].definition}"
              </p>
              <div className="text-xs text-slate-600 mt-4 font-mono font-medium">
                <strong>Example:</strong> {fancyWordsData[currentWordIdx].example}
              </div>
            </div>
          </div>

          <button
            onClick={drawRandomWord}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-indigo-200 hover:shadow-lg cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" /> Next Fancy Word
          </button>
        </div>

        {/* Famous Quotes */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-pink-600 uppercase font-extrabold">Verbal Masterpieces</span>
            <h3 className="text-lg font-bold font-sans mt-2 text-slate-900">Fictional Literary Quotes</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Deep sayings recorded during various family debates.</p>

            <div className="space-y-4 mt-6">
              {litQuotesData.slice(0, 2).map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 shadow-inner"
                >
                  <p className="text-xs italic text-slate-700 font-medium">"{q.quote}"</p>
                  <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-slate-500 font-bold">
                    <span>— {q.source}</span>
                    <span className="text-purple-600">{q.context}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 font-mono font-bold mt-4">
            Aqdas remains undefeated in finding societal corruption inside toaster timers.
          </p>
        </div>
      </div>

      {/* Literary Translator & Poetry Generator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Translator */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <Languages className="w-5 h-5 text-indigo-500" /> Literary Translator
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Translate normal, humble human phrases into incredibly dramatic, Shakespearean expressions.
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["I'm hungry.", "I am tired.", "My homework is hard.", "The Wi-Fi is down."].map((txt) => (
                <button
                  key={txt}
                  onClick={() => selectPresetText(txt)}
                  className="px-3 py-1 rounded-lg text-[10px] border bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:text-indigo-900 hover:border-indigo-200 text-slate-700 font-bold transition-all cursor-pointer shadow-sm"
                >
                  {txt}
                </button>
              ))}
            </div>

            {/* Input field */}
            <div className="mt-4">
              <textarea
                className="w-full p-3.5 rounded-2xl text-xs border outline-none font-sans bg-slate-50/50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-500/50 transition-all font-medium"
                rows={3}
                placeholder="Type a normal sentence... (e.g., 'Let's order some pizza')"
                value={translatorInput}
                onChange={(e) => setTranslatorInput(e.target.value)}
              />
            </div>

            {/* Output Field */}
            {translatorOutput && (
              <div className="mt-4 p-4 rounded-2xl border bg-indigo-50 border-indigo-200 text-indigo-950 animate-fade-in shadow-inner">
                <div className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest font-extrabold">
                  Translated Drama:
                </div>
                <p className="text-xs italic mt-1.5 font-serif leading-relaxed font-semibold">
                  {translatorOutput}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-200 hover:shadow-lg cursor-pointer"
          >
            {isTranslating ? "Translating Verse..." : "Translate to Sophisticated Prose"}
          </button>
        </div>

        {/* Poetry Synthesizer */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900">
              <FileText className="w-5 h-5 text-purple-500" /> Poetic Verse Synthesizer
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Select an everyday phenomenon and synthesize a high-tragedy gothic poem about it.
            </p>

            {/* Selection */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {(["wifi", "tea", "pizza", "alarm"] as const).map((topic) => (
                <button
                  key={topic}
                  onClick={() => setPoemTopic(topic)}
                  className={`py-2 rounded-xl text-[10px] font-mono capitalize border transition-all cursor-pointer font-bold ${
                    poemTopic === topic
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-indigo-50"
                  }`}
                >
                  {topic === "wifi" ? "Wi-Fi" : topic}
                </button>
              ))}
            </div>

            {/* Poem Output Box */}
            <div className="mt-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/60 shadow-inner text-center min-h-[140px] flex flex-col justify-center">
              {generatedPoem.length === 0 ? (
                <div className="text-xs text-slate-400 font-medium">
                  <HelpCircle className="w-8 h-8 mx-auto opacity-30 mb-2" />
                  Select a topic and generate poetry
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in text-left">
                  {generatedPoem.map((stanza, idx) => (
                    <p key={idx} className="text-[11.5px] font-serif italic leading-relaxed text-indigo-950 whitespace-pre-line font-semibold">
                      {stanza}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleGeneratePoem}
            disabled={isPoetizing}
            className="w-full mt-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-200 hover:shadow-lg cursor-pointer"
          >
            {isPoetizing ? "Consulting Muse..." : "Synthesize Tragedy"}
          </button>
        </div>
      </div>
    </div>
  );
};
