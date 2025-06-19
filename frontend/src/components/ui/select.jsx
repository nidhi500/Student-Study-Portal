export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
    >
      {children}
    </select>
  );
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}
