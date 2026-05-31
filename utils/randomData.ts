export function generateEmployeeName(prefix = 'Auto') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);

  return {
    firstName: `${prefix}FN${timestamp}`,
    lastName: `${prefix}LN${random}`
  };
}