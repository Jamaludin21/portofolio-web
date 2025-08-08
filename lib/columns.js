export const experienceColumnsConfig = [
  { type: "drag", id: "drag" },
  { type: "select", id: "select" },
  { title: "Title", dataIndex: "title", id: "title" },
  { title: "Company", dataIndex: "company", id: "company" },
  { title: "Location", dataIndex: "location", id: "location" },
  { title: "Start", dataIndex: "startDate", type: "date", id: "startDate" },
  { title: "End", dataIndex: "endDate", type: "date", id: "endDate" },
  {
    title: "Content",
    dataIndex: "content",
    type: "description",
    id: "content",
  },
  { title: "Image", dataIndex: "imageUrl", type: "image", id: "imageUrl" },
  {
    title: "Published",
    dataIndex: "isPublished",
    type: "boolean",
    id: "isPublished",
  },
  { type: "actions", id: "actions" },
];

export const skillColumnsConfig = [
  { type: "drag", id: "drag" },
  { type: "select", id: "select" },
  { title: "Name", dataIndex: "name", id: "name" },
  { title: "Level", dataIndex: "level", type: "badge", id: "level" },
  { title: "Category", dataIndex: "category", type: "badge", id: "category" },
  {
    title: "Published",
    dataIndex: "isPublished",
    type: "boolean",
    id: "isPublished",
  },
  { type: "actions", id: "actions" },
];

export const educationColumnsConfig = [
  { type: "drag", id: "drag" },
  { type: "select", id: "select" },
  { title: "School", dataIndex: "school", id: "school" },
  { title: "Major", dataIndex: "major", id: "major" },
  { title: "Degree", dataIndex: "degree", type: "badge", id: "degree" },
  { title: "Start", dataIndex: "startDate", type: "date", id: "startDate" },
  { title: "End", dataIndex: "endDate", type: "date", id: "endDate" },
  {
    title: "Description",
    dataIndex: "description",
    type: "description",
    id: "description",
  },
  { title: "Image", dataIndex: "imageUrl", type: "image", id: "imageUrl" },
  {
    title: "Published",
    dataIndex: "isPublished",
    type: "boolean",
    id: "isPublished",
  },
  { type: "actions", id: "actions" },
];
