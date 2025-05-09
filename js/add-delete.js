export function addEntry(entry, entryArray) {
  entryArray.push(entry);
  return entryArray;
}

export function deleteEntry(entry, entryArray) {
  const index = entryArray.indexOf(entry);
  if (index !== -1) {
    entryArray.splice(index, 1);
  }
  return entryArray;
}