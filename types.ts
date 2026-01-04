
export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'edge' | 'compute' | 'database' | 'event' | 'cache';
  description: string;
  tech: string[];
}

export interface ArchitectureLink {
  source: string;
  target: string;
  label?: string;
}

export interface TechStackItem {
  requirement: string;
  technology: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
