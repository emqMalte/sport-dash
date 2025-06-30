export const Error = ({ error }: { error: Error }) => (
  <div className="rounded-sm border bg-red-800 p-4 text-center text-2xl text-white drop-shadow-xl">
    <span className="font-extrabold">Error</span>: {error.message}
  </div>
);
