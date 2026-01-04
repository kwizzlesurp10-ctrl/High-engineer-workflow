
import React from 'react';
import { TECH_STACK } from '../constants';

const TechStackTable: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TECH_STACK.map((item, idx) => (
        <div key={idx} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors group">
          <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            {item.requirement}
          </h4>
          <div className="mono text-sm text-slate-100 bg-slate-900/80 p-3 rounded-lg border border-slate-700 mb-3 group-hover:bg-slate-900 transition-colors">
            {item.technology}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TechStackTable;
