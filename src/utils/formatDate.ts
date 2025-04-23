export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Example usage:
// const exampleDate = new Date('2025-04-17');
// console.log(formatDate(exampleDate)); // Output: April 17, 2025