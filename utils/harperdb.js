export const harperFetch = async (body) => {
  const request = await fetch(`${process.env.HARPERDB_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.HARPERDB_SECRET}`,
    },
    body: JSON.stringify(body),
  });

  const data = await request.json();
  return data;
};
