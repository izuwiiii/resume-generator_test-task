import { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import type { FormData } from "../types/resume";

export function useResumeFormRHF(onSubmitExternal: SubmitHandler<FormData>) {
  const { register, control, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { name: "", city: "", skills: [], experience: [] },
  });

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    appendSkill({ id: Date.now(), name: skillInput.trim() });
    setSkillInput("");
  };

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experience" });

  const [experienceInput, setExperienceInput] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleAddExperience = async () => {
    if (!experienceInput.trim() || !startDate || !endDate) return;

    appendExperience({
      id: Date.now(),
      name: experienceInput.trim(),
      startedAt: startDate,
      endedAt: endDate,
    });
    setExperienceInput("");
  };

  return {
    register,
    control,
    handleSubmit,
    onSubmit: onSubmitExternal,
    skillsFields,
    handleAddSkill,
    removeSkill,
    skillInput,
    setSkillInput,
    experienceFields,
    handleAddExperience,
    removeExperience,
    experienceInput,
    setExperienceInput,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reset,
    watch,
  };
}
