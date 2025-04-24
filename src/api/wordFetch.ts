export async function fetchWords(query: string) {
  const res = await fetch(`http://localhost:8888/koreanDictionary/${query}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}