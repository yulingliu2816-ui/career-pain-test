/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BarChart3, ArrowRight, RefreshCcw } from 'lucide-react';
import { QUESTIONS, RESULTS_INFO, type Question } from './constants';

type Step = 'landing' | 'quiz' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});

  // Set document title
  useEffect(() => {
    document.title = "猫猫吐司职业规划｜职业痛苦来源诊断器";
  }, []);

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: number, value: 'A' | 'B' | 'C') => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setStep('result');
      }, 500);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const results = useMemo(() => {
    if (step !== 'result') return null;
    
    const counts: Record<'A' | 'B' | 'C', number> = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach(val => {
      counts[val as 'A' | 'B' | 'C']++;
    });
    
    const total = QUESTIONS.length;
    const percentages = {
      A: Math.round((counts.A / total) * 100),
      B: Math.round((counts.B / total) * 100),
      C: Math.round((counts.C / total) * 100),
    };
    
    const sorted = (['A', 'B', 'C'] as const).slice().sort((a, b) => counts[b] - counts[a]);
    
    return {
      percentages,
      primary: sorted[0],
      secondary: sorted[1],
    };
  }, [answers, step]);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-sm relative overflow-hidden">
      {/* Brand Header */}
      <header className="py-6 px-6 border-b border-slate-50 flex justify-center items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="brand-text text-xl font-bold tracking-wider text-slate-800">
          猫猫吐司职业规划
        </h1>
      </header>

      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold leading-tight text-slate-900">
                  你的工作痛苦，<br />
                  可能不是因为你不够努力
                </h2>
                <p className="text-slate-500 text-lg">
                  3分钟测出你真正的职业错配点
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-600 leading-relaxed text-sm">
                  职场痛苦往往源于某种“错配”。本工具将从结构、环境、反馈三个维度，帮你识别核心痛点，找回职场掌控感。
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors active:scale-[0.98]"
              >
                开始测试 <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Progress</span>
                  <span className="text-sm font-medium text-slate-600">
                    {currentQuestionIndex + 1} / {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-slate-900"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="flex-1 space-y-8">
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {QUESTIONS[currentQuestionIndex].text}
                </h3>

                <div className="space-y-3">
                  {QUESTIONS[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(QUESTIONS[currentQuestionIndex].id, option.value)}
                      className={`w-full p-5 text-left rounded-xl border transition-all flex items-start gap-4 group ${
                        answers[QUESTIONS[currentQuestionIndex].id] === option.value
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                        answers[QUESTIONS[currentQuestionIndex].id] === option.value
                          ? 'border-white/30 bg-white/10'
                          : 'border-slate-200 bg-slate-50 text-slate-400 group-hover:text-slate-600'
                      }`}>
                        {option.label}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    currentQuestionIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <ChevronLeft size={18} /> 上一题
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && results && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-slate-900 text-white rounded-2xl mb-2">
                  <BarChart3 size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">诊断结果分析</h2>
                <p className="text-slate-500 text-sm">基于你的职场现状反馈</p>
              </div>

              {/* Charts */}
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {(['A', 'B', 'C'] as const).map((key) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className={`text-sm font-bold ${results.primary === key ? 'text-slate-900' : 'text-slate-500'}`}>
                        {RESULTS_INFO[key].title}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-400">
                        {results.percentages[key]}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${results.primary === key ? 'bg-slate-900' : 'bg-slate-400'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${results.percentages[key]}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Analysis */}
              <div className="space-y-6">
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900">
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded uppercase tracking-wider">主要原因</span>
                    <h4 className="font-bold text-lg">{RESULTS_INFO[results.primary].title}</h4>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {RESULTS_INFO[results.primary].desc}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {RESULTS_INFO[results.primary].detail}
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-slate-900 font-bold text-sm">
                      {RESULTS_INFO[results.primary].advice}
                    </p>
                  </div>
                </div>

                {results.percentages[results.secondary] > 0 && (
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">次要影响</span>
                      <h4 className="font-bold text-sm">{RESULTS_INFO[results.secondary].title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm italic">
                      同时也存在一定的{RESULTS_INFO[results.secondary].title.toLowerCase()}迹象，建议同步关注。
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors active:scale-[0.98]"
              >
                <RefreshCcw size={18} /> 重新测试
              </button>

              <p className="text-center text-[10px] text-slate-400 uppercase tracking-[0.2em] font-medium pb-4">
                Powered by 猫猫吐司职业规划
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
