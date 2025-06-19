export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50"
    >
      {children}
    </button>
  );
}
