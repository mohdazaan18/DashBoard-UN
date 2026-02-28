export const fetchPopulationData = async (
  group: string,
  startYear?: number,
  endYear?: number
) => {
  const params = new URLSearchParams();

  if (group) params.append("group", group);
  if (startYear) params.append("startYear", startYear.toString());
  if (endYear) params.append("endYear", endYear.toString());

  const response = await fetch(
    `http://localhost:5000/api/population?${params.toString()}`
  );

  return response.json();
};