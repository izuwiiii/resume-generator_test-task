import { X } from "lucide-react";
import { type Experience } from "../types/resume";
import { getFullDate } from "../utils/getFullDate";

type Props = {
  experience: Experience[];
  onDelete: (id: number) => void;
};

export function ExperienceList({ experience, onDelete }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {experience.map((exp) => {
        const { start, end } = getFullDate(exp);
        return (
          <li
            key={exp.id}
            className="bg-[#90e0ef] rounded-[4px] p-1 flex items-center justify-between"
          >
            <p>
              {exp.name} {start} - {end}
            </p>
            <X size={16} cursor="pointer" onClick={() => onDelete(exp.id)} />
          </li>
        );
      })}
    </ul>
  );
}
