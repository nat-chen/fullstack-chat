import { Participant } from './../utils/typeorm/entities/Participant';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from './../utils/types';

export interface IParticipantsService {
  findParticipant(params: FindParticipantParams): Promise<Participant | null>;

  createParticipant(params: CreateParticipantParams): Promise<Participant>;
}
