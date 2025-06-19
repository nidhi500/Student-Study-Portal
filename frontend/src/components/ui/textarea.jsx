export function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600"
    />
  );
}
