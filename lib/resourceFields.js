export const IMAGE_FIELD_KEYS = {
  experience: ["imageUrl"],
  skill: ["imageUrl"],
  education: ["imageUrl"],
};

export const FIELD_CONFIG = {
  experience: [
    { key: "title", label: "Title", type: "text", required: true, span: "1" },
    { key: "company", label: "Company", type: "text", span: "1" },
    { key: "location", label: "Location", type: "text", span: "1" },
    { key: "startDate", label: "Start Date", type: "date", span: "1" },
    { key: "endDate", label: "End Date", type: "date", span: "1" },
    { key: "imageUrl", label: "Image", type: "image", span: "full" },
    { key: "content", label: "Content", type: "textarea", span: "full" },
    { key: "isPublished", label: "Published", type: "boolean", span: "1" },
  ],
  skill: [
    { key: "name", label: "Name", type: "text", required: true, span: "1" },
    { key: "level", label: "Level", type: "text", span: "1" },
    { key: "category", label: "Category", type: "text", span: "1" },
    { key: "imageUrl", label: "Image", type: "image", span: "full" },
    { key: "isPublished", label: "Published", type: "boolean", span: "1" },
  ],
  education: [
    { key: "school", label: "School", type: "text", required: true, span: "1" },
    { key: "major", label: "Major", type: "text", span: "1" },
    { key: "degree", label: "Degree", type: "text", span: "1" },
    { key: "startDate", label: "Start Date", type: "date", span: "1" },
    { key: "endDate", label: "End Date", type: "date", span: "1" },
    { key: "imageUrl", label: "Image", type: "image", span: "full" },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      span: "full",
    },
    { key: "isPublished", label: "Published", type: "boolean", span: "1" },
  ],
};
