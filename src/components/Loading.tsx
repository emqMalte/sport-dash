import { FaSpinner } from "./icons/FaSpinner";

export const Loading = () => (
  <div className="my-16 text-center text-2xl font-bold">
    <FaSpinner className="mx-auto my-2 block size-12 animate-spin" />
    Loading...
  </div>
);
