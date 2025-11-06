import { Client } from "cassandra-driver";

const cassandraClient = new Client({
  contactPoints: ["127.0.0.1"], // or ["cassandra"] if using Docker container name
  localDataCenter: "datacenter1",
  keyspace: "webwatch",
});

const connectDB = async () => {
  try {
    await cassandraClient.connect();
    console.log("✅ Connected to Cassandra");
  } catch (err: any) {
    console.error("❌ Cassandra connection error:", err);
  }
};

connectDB();

export default cassandraClient;
