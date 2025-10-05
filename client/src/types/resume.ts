export type FormData = {
  name: string;
  city: string;
  skills: Skill[];
  experience: Experience[];
};

export type Skill = {
  id: number;
  name: string;
};

export type Experience = {
  id: number;
  name: string;
  startedAt: Date;
  endedAt: Date;
};
