import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '0', position: { x: 0, y: 0 }, data: { label: 'home' } },
  // Top-level navigation items
  { id: '1', position: { x: -300, y: 100 }, data: { label: 'about' } },
  { id: '2', position: { x: -150, y: 100 }, data: { label: 'admission' } },
  { id: '3', position: { x: 0, y: 100 }, data: { label: 'academics' } },
  { id: '4', position: { x: 150, y: 100 }, data: { label: 'campus life' } },
  { id: '5', position: { x: 300, y: 100 }, data: { label: 'contact' } },

  // Sub-navigation items under 'about'
  { id: '6', position: { x: -1350, y: 200 }, data: { label: 'about us' } },
  { id: '7', position: { x: -1200, y: 200 }, data: { label: 'our students' } },
  { id: '8', position: { x: -1050, y: 200 }, data: { label: 'campus setting' } },
  { id: '9', position: { x: -900, y: 200 }, data: { label: 'Board of Trustees' } },
  { id: '10', position: { x: -750, y: 200 }, data: { label: 'staff' } },
  { id: '11', position: { x: -600, y: 200 }, data: { label: 'faculty' } },
  { id: '12', position: { x: -450, y: 200 }, data: { label: 'community' } },
  { id: '13', position: { x: -300, y: 200 }, data: { label: 'Test Center' } },

  // Sub-navigation items under 'admission'
  // { id: '14', position: { x: -1200, y: 300 }, data: { label: 'our admission' } },
  { id: '15', position: { x: -1050, y: 300 }, data: { label: 'international' } },
  { id: '16', position: { x: -900, y: 300 }, data: { label: 'domestic' } },
  { id: '17', position: { x: -750, y: 300 }, data: { label: 'military services' } },
  { id: '18', position: { x: -600, y: 300 }, data: { label: 'transfer credits' } },
  { id: '19', position: { x: -450, y: 300 }, data: { label: 'Application Forms' } },
  { id: '20', position: { x: -300, y: 300 }, data: { label: 'Tuition & Policies' } },

  // Sub-navigation items under 'academics'
  { id: '21', position: { x: -750, y: 400 }, data: { label: 'educational outcomes' } },
  { id: '22', position: { x: -600, y: 400 }, data: { label: 'graduate' } },
  { id: '23', position: { x: -450, y: 400 }, data: { label: 'undergraduate' } },
  { id: '24', position: { x: -300, y: 400 }, data: { label: 'academic recognition' } },
  { id: '25', position: { x: -150, y: 400 }, data: { label: 'attendance policy' } },
  { id: '26', position: { x: 0, y: 400 }, data: { label: 'other policies' } },
  { id: '27', position: { x: 150, y: 400 }, data: { label: 'Code of Conduct' } },
  { id: '28', position: { x: 300, y: 400 }, data: { label: 'ESOL' } },
  { id: '29', position: { x: 450, y: 400 }, data: { label: 'Certifications' } },
  { id: '30', position: { x: 600, y: 400 }, data: { label: 'catalog' } },
  { id: '31', position: { x: 750, y: 400 }, data: { label: 'calendar' } },
  { id: '32', position: { x: 900, y: 400 }, data: { label: 'Library' } },

  // Sub-navigation items under 'campus life'
  { id: '33', position: { x: 150, y: 300 }, data: { label: 'students' } },
  { id: '34', position: { x: 300, y: 300 }, data: { label: 'Esports' } },
  { id: '35', position: { x: 450, y: 300 }, data: { label: 'student services' } },
  { id: '36', position: { x: 600, y: 300 }, data: { label: 'Document Request' } },
  { id: '37', position: { x: 750, y: 300 }, data: { label: 'Transcript Request' } },
];

const initialEdges = [
// Edges from 'home' to its sub-navigation items
{ id: 'e0-1', source: '0', target: '1' },
{ id: 'e0-2', source: '0', target: '2' },
{ id: 'e0-3', source: '0', target: '3' },
{ id: 'e0-4', source: '0', target: '4' },
{ id: 'e0-5', source: '0', target: '5' },

  // Edges from 'about' to its sub-navigation items
  { id: 'e1-6', source: '1', target: '6' },
  { id: 'e1-7', source: '1', target: '7' },
  { id: 'e1-8', source: '1', target: '8' },
  { id: 'e1-9', source: '1', target: '9' },
  { id: 'e1-10', source: '1', target: '10' },
  { id: 'e1-11', source: '1', target: '11' },
  { id: 'e1-12', source: '1', target: '12' },
  { id: 'e1-13', source: '1', target: '13' },

  // Edges from 'admission' to its sub-navigation items
  { id: 'e2-14', source: '2', target: '14' },
  { id: 'e2-15', source: '2', target: '15' },
  { id: 'e2-16', source: '2', target: '16' },
  { id: 'e2-17', source: '2', target: '17' },
  { id: 'e2-18', source: '2', target: '18' },
  { id: 'e2-19', source: '2', target: '19' },
  { id: 'e2-20', source: '2', target: '20' },

  // Edges from 'academics' to its sub-navigation items
  { id: 'e3-21', source: '3', target: '21' },
  { id: 'e3-22', source: '3', target: '22' },
  { id: 'e3-23', source: '3', target: '23' },
  { id: 'e3-24', source: '3', target: '24' },
  { id: 'e3-25', source: '3', target: '25' },
  { id: 'e3-26', source: '3', target: '26' },
  { id: 'e3-27', source: '3', target: '27' },
  { id: 'e3-28', source: '3', target: '28' },
  { id: 'e3-29', source: '3', target: '29' },
  { id: 'e3-30', source: '3', target: '30' },
  { id: 'e3-31', source: '3', target: '31' },
  { id: 'e3-32', source: '3', target: '32' },

  // Edges from 'campus life' to its sub-navigation items
  { id: 'e4-33', source: '4', target: '33' },
  { id: 'e4-34', source: '4', target: '34' },
  { id: 'e4-35', source: '4', target: '35' },
  { id: 'e4-36', source: '4', target: '36' },
  { id: 'e4-37', source: '4', target: '37' },
];

 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: 'calc(100vw - 124px)', height: '100svh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}