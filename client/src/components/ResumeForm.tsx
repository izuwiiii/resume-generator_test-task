import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { getFullDate } from "../utils/getFullDate";
import { useResumeFormRHF } from "../hooks/useResumeFormRHF";
import type { FormData } from "../types/resume";

export function ResumeForm() {
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error generating file");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.docx";
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Resume generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error generating resume");
    }
  };

  const {
    register,
    handleSubmit,
    onSubmit: onSubmitHook,
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
    // appendExperience,
  } = useResumeFormRHF(onSubmit);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHook)}
      className="flex flex-col gap-2 w-1/3 bg-[#caf0f8] p-4 rounded-md"
    >
      <h1 className="text-[26px] font-bold text-[#03045e]">
        Generate your resume!
      </h1>

      <input {...register("name")} placeholder="Name" className="form__input" />
      <input {...register("city")} placeholder="City" className="form__input" />

      <div className="flex gap-2">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Skill name"
          className="form__input flex-1"
        />
        <button type="button" onClick={handleAddSkill} className="form__button">
          Add
        </button>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {skillsFields.map((skill, index) => (
          <li
            key={skill.id}
            className="bg-[#90e0ef] rounded-[4px] p-1 flex items-center"
          >
            {skill.name}
            <X size={16} cursor="pointer" onClick={() => removeSkill(index)} />
          </li>
        ))}
      </ul>

      <input
        value={experienceInput}
        onChange={(e) => setExperienceInput(e.target.value)}
        placeholder="Experience name"
        className="form__input"
      />
      <div className="flex gap-2 items-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          withPortal
          className="form__input w-[120px]"
        />
        {" - "}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          withPortal
          className="form__input w-[120px]"
        />
        <button
          type="button"
          onClick={() => {
            if (!experienceInput.trim() || !startDate || !endDate) return;
            handleAddExperience();
            setExperienceInput("");
            setStartDate(new Date());
            setEndDate(new Date());
          }}
          className="form__button"
        >
          Add
        </button>
      </div>

      <ul className="flex flex-col gap-2 mt-2">
        {experienceFields.map((exp, index) => {
          const { start, end } = getFullDate(exp);
          return (
            <li
              key={exp.id}
              className="bg-[#90e0ef] rounded-[4px] p-1 flex items-center justify-between"
            >
              {exp.name} {start} - {end}
              <X
                size={16}
                cursor="pointer"
                onClick={() => removeExperience(index)}
              />
            </li>
          );
        })}
      </ul>

      <button type="submit" className="form__button mt-2">
        Generate
      </button>
    </form>
  );
}
