import mongoose from 'mongoose';

import { v4 as uuidv4 } from 'uuid';


const CheckSchema = new mongoose.Schema({
  checkId: { 
    type: String, 
    default: () => uuidv4() // Auto-populate with a new UUID
  },
  data: { 
    type: Object,
    default: () => ({}) // Initialize as an empty object
  }
});

export const Check = mongoose.model('Check', CheckSchema);
