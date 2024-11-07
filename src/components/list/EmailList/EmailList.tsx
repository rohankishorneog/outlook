import EmailCard from "@/components/cards/EmailCard/EmailCard";
import { Email } from "@/types/types";

interface EmailListProps {
  emails: Email[];
  handleSelectEmail: (email: Email) => void;
  selectedMail: Email | undefined | null;
}

const EmailList = ({
  emails,
  handleSelectEmail,
  selectedMail,
}: EmailListProps) => {
  return (
    <ul
      className={`flex flex-col gap-2 overflow-y-auto h-full ${
        selectedMail ? "w-1/3 hidden lg:block" : "w-full"
      }`}
    >
      {emails.map((email) => (
        <EmailCard
          key={email.id}
          email={email}
          handleSelectEmail={handleSelectEmail}
          selectedMail={selectedMail}
        />
      ))}
    </ul>
  );
};

export default EmailList;
