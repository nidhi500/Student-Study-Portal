export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
      {children}
    </label>
  );
}
