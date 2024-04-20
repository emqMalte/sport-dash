import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loading = () => (
  <div className="my-16 text-center text-2xl font-bold">
    <FontAwesomeIcon
      icon={faSpinner}
      className="mx-auto my-2 block animate-spin text-6xl"
    />
    Loading...
  </div>
);
