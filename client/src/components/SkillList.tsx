import { X } from "lucide-react";
import { type Skill } from "../types/resume";

type Props = {
  skills: Skill[];
  onDelete: (id: number) => void;
};

export function SkillList({ skills, onDelete }: Props) {
  return (
    <ul className="flex gap-2 flex-wrap">
      {skills.map((skill) => (
        <li
          key={skill.id}
          className="bg-[#90e0ef] rounded-[4px] p-1 flex items-center"
        >
          {skill.name}
          <X size={16} cursor="pointer" onClick={() => onDelete(skill.id)} />
        </li>
      ))}
    </ul>
  );
}
