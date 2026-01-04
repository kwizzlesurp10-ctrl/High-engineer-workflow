
import { ArchitectureNode, ArchitectureLink, TechStackItem } from './types';

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  { id: 'lb', label: 'Global Load Balancer', type: 'edge', description: 'Anycast-based global ingress routing users to nearest regional cluster.', tech: ['Cloud Load Balancing', 'Anycast', 'QUIC/HTTP3'] },
  { id: 'gateway', label: 'API Gateway (Envoy)', type: 'compute', description: 'Handles gRPC-Web, WebSockets, and Circuit Breaking (Resilience4j logic).', tech: ['Envoy', 'Go', 'Wasm Filters'] },
  { id: 'location-svc', label: 'Ingress & Smoothing', type: 'compute', description: 'Go service for gRPC streaming. Implements Kalman Filters for GPS noise reduction.', tech: ['Go', 'gRPC-Web', 'Kalman Filter'] },
  { id: 'matching-engine', label: 'Matching (Java)', type: 'compute', description: 'High-fidelity matching engine using H3 cell resolution 7/8 for spatial joins.', tech: ['Java 21', 'Uber H3', 'Virtual Threads'] },
  { id: 'kafka', label: 'Kafka (Event Log)', type: 'event', description: 'Exactly-once semantics. Orders updates by UserID using Murmur2 hashing.', tech: ['Kafka (KRaft)', 'Protobuf'] },
  { id: 'redis', label: 'Hot Cache (Redis)', type: 'cache', description: 'Partitioned by H3 Cell ID. Stores "Last Known Good" snapped positions.', tech: ['Redis Cluster', 'Geospatial Index'] },
  { id: 'postgres', label: 'Transactional DB', type: 'database', description: 'Strong consistency for financial states and trip state machines.', tech: ['PostgreSQL', 'Cloud Spanner'] },
  { id: 'cassandra', label: 'History & Metrics', type: 'database', description: 'Stores petabytes of historical traces for Flink-based ETA modeling.', tech: ['ScyllaDB', 'Cassandra'] },
  { id: 'analytics', label: 'Streaming Analytics', type: 'compute', description: 'Flink/Spark jobs calculating real-time ETA deviations and heatmaps.', tech: ['Apache Flink', 'Python', 'Spark'] },
];

export const ARCHITECTURE_LINKS: ArchitectureLink[] = [
  { source: 'lb', target: 'gateway' },
  { source: 'gateway', target: 'location-svc', label: 'gRPC Stream' },
  { source: 'location-svc', target: 'kafka', label: 'UserID Partition' },
  { source: 'location-svc', target: 'redis', label: 'Snap-to-Road' },
  { source: 'kafka', target: 'matching-engine' },
  { source: 'matching-engine', target: 'redis', label: 'H3 Grid Lookup' },
  { source: 'matching-engine', target: 'postgres', label: 'ACID Match' },
  { source: 'kafka', target: 'analytics' },
  { source: 'analytics', target: 'cassandra', label: 'Historical Sink' },
  { source: 'gateway', target: 'postgres' },
  { source: 'location-svc', target: 'cassandra', label: 'Audit Log' },
];

export const TECH_STACK: TechStackItem[] = [
  { requirement: 'Zero-Latency Streaming', technology: 'Go + gRPC-Web + Envoy', description: 'Replaces polling to ensure smooth, "non-jumping" map icons.' },
  { requirement: 'Spatial Accuracy', technology: 'Kalman Filters + HMM', description: 'Java/Go logic to "Snap-to-Road" and remove GPS noise.' },
  { requirement: 'Fast Discovery', technology: 'H3 (Hexagonal Indexing)', description: 'Partitioning cache by H3 cells for sub-50ms neighbor lookups.' },
  { requirement: 'Predictive ETAs', technology: 'Apache Flink + Cassandra', description: 'Proactive alerts based on historical velocity trends.' },
  { requirement: 'Fault Tolerance', technology: 'Circuit Breakers + Envoy', description: 'Graceful degradation to "Static Proximity" if Matching fails.' },
  { requirement: 'Data Consistency', technology: 'Kafka Exactly-Once', description: 'Ensuring zero lost location updates during rebalances.' },
];
