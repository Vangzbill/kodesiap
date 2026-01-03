export interface TestCase {
  input: string;
  output: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  explanation?: string;
  solutionCode: string; // Python solution
  timeComplexity: string;
  spaceComplexity: string;
  testCases: TestCase[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  concept: string;
  conceptImage?: string; // Placeholder URL
  templateCode: string; // Python template
  problems: Problem[];
}

export interface UserProgress {
  completedTopics: string[];
  solvedProblems: string[];
}