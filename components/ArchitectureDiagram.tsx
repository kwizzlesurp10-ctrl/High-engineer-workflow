
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ARCHITECTURE_NODES, ARCHITECTURE_LINKS } from '../constants';
import { ArchitectureNode } from '../types';

interface Props {
  onNodeClick: (node: ArchitectureNode) => void;
}

const ArchitectureDiagram: React.FC<Props> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.parentElement!.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = 500;

    const simulation = d3.forceSimulation<any>(ARCHITECTURE_NODES)
      .force("link", d3.forceLink<any, any>(ARCHITECTURE_LINKS).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-1500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(80));

    const g = svg.append("g");

    // Add zoom
    svg.call(d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      g.attr("transform", event.transform);
    }));

    // Markers for arrows
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#64748b")
      .style("stroke", "none");

    const link = g.append("g")
      .selectAll("line")
      .data(ARCHITECTURE_LINKS)
      .enter().append("line")
      .attr("stroke", "#334155")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    const node = g.append("g")
      .selectAll("g")
      .data(ARCHITECTURE_NODES)
      .enter().append("g")
      .style("cursor", "pointer")
      .on("click", (_, d) => onNodeClick(d))
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("rect")
      .attr("width", 140)
      .attr("height", 60)
      .attr("x", -70)
      .attr("y", -30)
      .attr("rx", 8)
      .attr("fill", d => {
        switch (d.type) {
          case 'edge': return '#1e40af';
          case 'compute': return '#1e293b';
          case 'database': return '#064e3b';
          case 'event': return '#7c2d12';
          case 'cache': return '#701a75';
          default: return '#1e293b';
        }
      })
      .attr("stroke", "#475569")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "#f8fafc")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text(d => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => { simulation.stop(); };
  }, [dimensions, onNodeClick]);

  return (
    <div className="w-full h-[500px] relative overflow-hidden bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold bg-slate-900 px-2 py-1 rounded border border-slate-700">
          Interactive Topology
        </span>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ArchitectureDiagram;
