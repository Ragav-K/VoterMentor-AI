import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY } from '../glossary';
import { SupportedLanguage } from '../types';

interface GlossaryTextProps {
  text: string;
  language: SupportedLanguage;
}

export function GlossaryText({ text, language }: GlossaryTextProps) {
  const glossaryEntries = GLOSSARY[language] || GLOSSARY.EN;
  const terms = Object.keys(GLOSSARY.EN).sort((a, b) => b.length - a.length); // Match longer terms first

  // Create a regex to match any of the terms (case-insensitive)
  // We allow an optional 's' at the end for simple plurals and capture the whole thing
  const termRegex = new RegExp(`\\b((?:${terms.map(t => t.replace(/_/g, '[ _]')).join('|')})s?)\\b`, 'gi');

  const parts = text.split(termRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        
        const normalizedPart = part.toLowerCase().replace(/[ -]/g, '_');
        // Simple heuristic: try exact match, then try singular if it ends in 's'
        let definition = glossaryEntries[normalizedPart];
        if (!definition && normalizedPart.endsWith('s')) {
          definition = glossaryEntries[normalizedPart.slice(0, -1)];
        }

        if (definition) {
          return <TermWithTooltip key={i} term={part} definition={definition} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

interface TermWithTooltipProps {
  term: string;
  definition: string;
  key?: React.Key;
}

function TermWithTooltip({ term, definition }: TermWithTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="cursor-help border-b border-dashed border-natural-accent text-natural-accent font-medium hover:bg-natural-accent/5 transition-colors">
        {term}
      </span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-natural-primary text-white text-xs rounded-xl shadow-xl pointer-events-none"
          >
            <div className="font-bold mb-1 border-b border-white/20 pb-1">{term}</div>
            {definition}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-natural-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
