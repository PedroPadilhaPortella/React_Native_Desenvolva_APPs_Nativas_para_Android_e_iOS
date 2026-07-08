import { avatarColors } from "../constants/avatarColors";
import { User } from "../models/User";

export const users: User[] = [
  { id: 1, name: "João Silva", email: "joao.silva@email.com", color: avatarColors[0] },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@email.com", color: avatarColors[1] },
  { id: 3, name: "Pedro Souza", email: "pedro.souza@email.com", color: avatarColors[2] },
  { id: 4, name: "Ana Costa", email: "ana.costa@email.com", color: avatarColors[3] },
  { id: 5, name: "Lucas Pereira", email: "lucas.pereira@email.com", color: avatarColors[4] },
  { id: 6, name: "Juliana Santos", email: "juliana.santos@email.com", color: avatarColors[5] },
  { id: 7, name: "Gabriel Almeida", email: "gabriel.almeida@email.com", color: avatarColors[6] },
  { id: 8, name: "Camila Rodrigues", email: "camila.rodrigues@email.com", color: avatarColors[7] },
  { id: 9, name: "Rafael Lima", email: "rafael.lima@email.com", color: avatarColors[8] },
  { id: 10, name: "Beatriz Fernandes", email: "beatriz.fernandes@email.com", color: avatarColors[9] },
];
