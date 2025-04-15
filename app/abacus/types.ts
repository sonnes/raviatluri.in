export interface Dictation {
  id: string;
  createdAt: Date;
  sections: DictationSection[];
}

export interface DictationSection {
  type: 'abacus' | 'visualization';
  problems: Problem[];
}

export interface Problem {
  numbers: number[];
  answer: number;
}
