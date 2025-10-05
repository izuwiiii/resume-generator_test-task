import { Document, HeadingLevel, Paragraph, TextRun } from "docx";

import { type Skill, type Experience } from "../client/src/types/resume.ts";
import { getFullDate } from "../client/src/utils/getFullDate.ts";

export function DocumentCreator(
  name: string,
  city: string,
  skills: Skill[],
  experience: Experience[]
) {
  return new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: name,
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: `City: ${city}`,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Skills:",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 },
          }),

          ...skills.map(
            (skill) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${skill.name}`,
                    size: 24,
                  }),
                ],
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            text: "Experience:",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 },
          }),

          ...experience.map((exp) => {
            const { start, end } = getFullDate(exp);
            return new Paragraph({
              children: [
                new TextRun({
                  text: `• ${exp.name} (${start} - ${end})`,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            });
          }),
        ],
      },
    ],
  });
}
