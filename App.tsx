
import React, { useState } from 'react';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import TechStackTable from './components/TechStackTable';
import AIAssistant from './components/AIAssistant';
import BackendUXSection from './components/BackendUXSection';
import { ArchitectureNode } from './types';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 pb-20 scroll-smooth">
        {/* Header Section */}
        <div className="p-6 lg:p-12 max-w-7xl mx-auto space-y-20">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded tracking-widest uppercase shadow-lg shadow-blue-500/20">Certified 2025</span>
              <span className="h-[1px] flex-1 bg-slate-800"></span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">High-Fidelity</span> LBS
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Moving beyond basic CRUD. Explore how 2025's top location-based services solve for 
              <strong> zero-latency streaming</strong>, <strong>H3 spatial indexing</strong>, and <strong>road-snapping</strong> accuracy.
            </p>
          </section>

          {/* Visualization Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.944l6-1.5a2 2 0 011.894 0l6 1.5A2 2 0 0120 5.618v9.764a2 2 0 01-1.106 1.789L13.447 20a2 2 0 01-1.894 0L9 20z" />
                </svg>
                Distributed Topology
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">Live Data Flow</span>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              <div className="xl:col-span-2">
                <ArchitectureDiagram onNodeClick={setSelectedNode} />
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full min-h-[500px] flex flex-col shadow-inner">
                <h3 className="text-lg font-bold mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Node Inspector
                </h3>
                {selectedNode ? (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1 block">{selectedNode.type}</span>
                      <h4 className="text-3xl font-bold text-white leading-tight">{selectedNode.label}</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {selectedNode.description}
                    </p>
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol & Tooling</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.tech.map((t, idx) => (
                          <span key={idx} className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-lg text-xs font-mono text-blue-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-8 mt-auto">
                      <button 
                        onClick={() => setSelectedNode(null)}
                        className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to overview
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="relative mb-6">
                      <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl"></div>
                      <svg className="w-16 h-16 text-slate-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Select a system component <br/> to view its operational blueprint.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* New UX Optimization Section */}
          <section className="pt-10 border-t border-slate-800">
             <BackendUXSection />
          </section>

          {/* Tech Stack Grid */}
          <section className="space-y-6 pt-10 border-t border-slate-800">
            <h2 className="text-3xl font-bold">The 2025 Critical Path</h2>
            <TechStackTable />
          </section>

          {/* Final Design Philosophies */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                 <span className="w-8 h-[2px] bg-emerald-400"></span>
                 Rider-Centric Pipeline
              </h3>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Ingress", desc: "gRPC streaming directly into a Kafka 'Raw Coordinates' topic." },
                  { step: "02", title: "Processing", desc: "Flink consumers apply Kalman filters for accuracy & H3 cell resolution 8 for indexing." },
                  { step: "03", title: "Matchmaking", desc: "Matching engine performs spatial join between Driver H3 Sets and Rider Cells in sub-20ms." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-slate-600 font-mono font-bold pt-1">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-slate-100">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold text-blue-400 mb-6">2025 Architecture Manifesto</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex-shrink-0 flex items-center justify-center text-xs mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Geographic Sharding:</strong> Physical isolation by region to reduce cross-continental noise.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex-shrink-0 flex items-center justify-center text-xs mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Graceful Degradation:</strong> Envoy circuit breakers fall back to cached data if matching engine is cold.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 flex-shrink-0 flex items-center justify-center text-xs mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Zero-Trust Location:</strong> Sign all GPS payloads at the edge to prevent spoofing/teleporting fraud.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* AI Sidebar */}
      <aside className="hidden lg:block w-96 flex-shrink-0">
        <AIAssistant />
      </aside>
    </div>
  );
};

export default App;
