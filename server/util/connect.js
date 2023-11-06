import { MongoClient } from 'mongodb';

export async function connectToMongo() {
  const client = new MongoClient(process.env.MONGO_URL);

  try {
    await client.connect();
    
    // Get the name of the connected database
    const databaseName = client.db().databaseName;
    
    // Get the cluster URL
    const clusterUrl = process.env.MONGO_URL;

    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    console.log(`Connected to database: ${databaseName}`);
    console.log(`MongoDB cluster URL: ${clusterUrl}`);
  } finally {
    await client.close();
  }
}
export const run= async()=> {
  try {
    await connectToMongo();
  } catch (error) {
    console.error(error);
  }
}

