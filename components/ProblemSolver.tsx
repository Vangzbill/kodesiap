import React, { useState } from 'react';
import { Play, Eye, EyeOff, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Problem } from '../types';
import CodeBlock from './CodeBlock';

interface ProblemSolverProps {
  problem: Problem;
  onSolve: (id: string) => void;
  isSolved: boolean;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ problem, onSolve, isSolved }) => {
  const [userCode, setUserCode] = useState(`def solution():\n    # Tulis kodemu disini\n    pass`);
  const [showSolution, setShowSolution] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [outputLog, setOutputLog] = useState<string>('');

  const handleRun = () => {
    setStatus('running');
    setOutputLog('Compiling and running tests...');
    
    // Simulate execution delay
    setTimeout(() => {
      // Mock validation: In a real app, this would use Pyodide or a backend
      const randomSuccess = Math.random() > 0.1; // 90% chance "pass" if they click run for demo
      
      if (userCode.trim().length < 20) {
        setStatus('error');
        setOutputLog(`Error: Code seems too short.\nExpected Output: ${problem.sampleOutput}\nActual Output: (Empty)`);
      } else {
        setStatus('success');
        setOutputLog(`Test Case 1: Input [${problem.sampleInput.replace(/\n/g, ', ')}] -> Passed\nTest Case 2: Hidden -> Passed\n\nResult: Accepted`);
        onSolve(problem.id);
      }
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-darkcard rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{problem.title}</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium
                ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {problem.difficulty}
              </span>
              {isSolved && <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium"><CheckCircle size={12} /> Solved</span>}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{problem.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-200 block mb-1">Input Format</span>
            <span className="font-mono text-gray-600 dark:text-gray-400 text-xs">{problem.inputFormat}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-200 block mb-1">Output Format</span>
            <span className="font-mono text-gray-600 dark:text-gray-400 text-xs">{problem.outputFormat}</span>
          </div>
        </div>

        <div className="mt-4">
           <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Example</div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Input</div>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs font-mono">{problem.sampleInput}</pre>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Output</div>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs font-mono">{problem.sampleOutput}</pre>
              </div>
           </div>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex flex-col h-[400px]">
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs flex justify-between items-center">
          <span>solution.py</span>
          <span className="text-gray-500">Python 3</span>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
          spellCheck={false}
        />
        <div className="bg-gray-100 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
          >
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setUserCode(`def solution():\n    # Tulis kodemu disini\n    pass`)}
              className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Reset Code"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={handleRun}
              disabled={status === 'running'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all
                ${status === 'running' ? 'bg-gray-500 cursor-not-allowed' : 'bg-accent hover:bg-green-600 shadow-lg shadow-green-500/20 active:scale-95'}`}
            >
              {status === 'running' ? (
                <>Running...</>
              ) : (
                <><Play size={16} fill="currentColor" /> Run Code</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Output Console */}
      {(status !== 'idle' || outputLog) && (
        <div className={`p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 font-mono text-sm
          ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
          <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider">
            {status === 'success' && <CheckCircle size={14} className="text-green-500" />}
            {status === 'error' && <AlertCircle size={14} className="text-red-500" />}
            Console Output
          </div>
          <pre className="whitespace-pre-wrap">{outputLog}</pre>
        </div>
      )}

      {/* Solution Reveal */}
      {showSolution && (
        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-800">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Solution Reference</h4>
          <CodeBlock code={problem.solutionCode} language="python" />
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-gray-700">
              <span className="text-gray-500">Time Complexity</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{problem.timeComplexity}</span>
            </div>
            <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-gray-700">
              <span className="text-gray-500">Space Complexity</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{problem.spaceComplexity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSolver;