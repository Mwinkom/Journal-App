//Filter entries by mood and search term
export function filterEntries(entries, mood, searchTerm) {
  return entries.filter(entry => {
    const matchesMood = !mood || entry.mood === mood;
    const matchesSearch =
      !searchTerm ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase().trim());

    return matchesMood && matchesSearch;
  });
}

