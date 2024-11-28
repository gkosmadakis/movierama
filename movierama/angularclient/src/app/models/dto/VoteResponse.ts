import { Vote } from "../vote.model";

export interface VoteResponse {
    message: string;
    status: string;
    vote: Vote; // The Vote object, or null if not applicable
  }
  