
import React from 'react';

const BackendUXSection: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="border-l-4 border-blue-500 pl-6">
        <h2 className="text-3xl font-bold mb-2 italic">"User-friendly" = High Performance</h2>
        <p className="text-slate-400">In the backend, UX is defined by reducing perceived latency and ensuring high spatial fidelity.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* 1. Zero Latency */}
        <div className="bg-slate-800/30 rounded-2xl border border-slate-700 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="text-blue-400 font-mono text-sm">01 // Streaming vs. Polling</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Zero-Latency Perception</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Stop using REST polling. It kills battery and creates "stutter." Implement <strong>gRPC-Web</strong> via Envoy.
              </p>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
                <li>Go-based Edge Ingress handles long-lived connections.</li>
                <li>UserID-based partitioning in Kafka for strict ordering.</li>
              </ul>
            </div>
            <div className="flex-1 bg-slate-950 rounded-xl p-4 border border-slate-800 mono text-xs">
              <div className="text-slate-500 mb-2">// Go: High-throughput GPS Stream</div>
              <pre className="text-emerald-400">
{`func (s *LocationServer) StreamLocation(
    stream pb.LocationService_StreamLocationServer
) error {
    for {
        req, err := stream.Recv()
        if err == io.EOF { return nil }
        
        // Produce to Kafka with Murmur2 hash
        msg := &sarama.ProducerMessage{
            Topic: "raw-coordinates",
            Key:   sarama.StringEncoder(req.UserId),
            Value: sarama.ByteEncoder(marshal(req)),
        }
        s.kafkaProducer.Input() <- msg
    }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* 2. Map Matching */}
        <div className="bg-slate-800/30 rounded-2xl border border-slate-700 p-8">
          <div className="flex flex-col md:flex-row gap-8">
             <div className="flex-1 bg-slate-950 rounded-xl p-4 border border-slate-800 mono text-xs order-2 md:order-1">
              <div className="text-slate-500 mb-2">// Java: H3 Neighbor Discovery</div>
              <pre className="text-blue-400">
{`public List<String> getNearby(double lat, double lng) {
    H3Core h3 = H3Core.newInstance();
    // Res 7 index (~1.2km resolution)
    String index = h3.latLngToCellAddress(lat, lng, 7);
    List<String> kRing = h3.gridDisk(index, 1); 

    // Multi-get from Redis (Hot State)
    return redis.mget(kRing.toArray(new String[0]));
}`}
              </pre>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <span className="text-emerald-400 font-mono text-sm">02 // Spatial Fidelity</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">The "Snap-to-Road" Effect</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Raw GPS is noisy. Use <strong>Kalman Filters</strong> to smooth jitter and Hidden Markov Models (HMM) to snap icons to OSM road segments.
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                 <p className="text-sm text-blue-200"><strong>H3 Hierarchy:</strong> Partitioning by resolution 7/8 ensures sub-50ms discovery of relevant supply/demand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendUXSection;
