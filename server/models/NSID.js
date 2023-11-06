import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const proofDaoSchema = new mongoose.Schema({
  nsId: { 
    type: String, 
  },
  data: { 
    type: Object,
    default: () => ({}) // Initialize as an empty object
  }
});

export const ProofDao = mongoose.model('NSID', proofDaoSchema);
