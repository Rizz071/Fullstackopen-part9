const Notification = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  setTimeout(() => {
    setMessage("");
  }, 3000);

  if (message.includes("Error:")) {
    return <p style={{ color: "red" }}>{message}</p>;
  } else {
    return <p style={{ color: "green" }}>{message}</p>;
  }
};

export default Notification;
