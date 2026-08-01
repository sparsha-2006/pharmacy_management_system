export function formatCurrency(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}