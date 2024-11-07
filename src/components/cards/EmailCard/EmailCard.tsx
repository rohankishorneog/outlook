import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Email } from "@/types/types";
import { formatDate } from "@/utils";

interface EmailCardProps {
  email: Email;
  handleSelectEmail: (email: Email) => void;
  selectedMail: Email | undefined | null;
}

const EmailCard = ({
  email,
  handleSelectEmail,
  selectedMail,
}: EmailCardProps) => {
  return (
    <Card
      onClick={() => handleSelectEmail(email)}
      data-testid="email-card"
      className={`w-full flex pl-10  hover:border-accent text-text ${
        email.read ? "bg-readbg" : "bg-background"
      } ${selectedMail === email ? "border-accent" : "border-border"}`}
    >
      <Avatar className="mt-5 size-12 bg-accent" data-testid="email-avatar">
        <AvatarFallback
          className="bg-accent text-white capitalize"
          data-testid="avatar-fallback"
        >
          {email.from.name[0]}
        </AvatarFallback>
      </Avatar>

      <div>
        <CardHeader data-testid="email-card-header">
          <CardTitle className="font-normal">
            <p data-testid="email-from">
              From:{" "}
              <span className="font-semibold">
                {email.from.name} {email.from.email}
              </span>
            </p>
            <p className="mt-3" data-testid="email-subject">
              Subject: <span className="font-semibold">{email.subject}</span>
            </p>
          </CardTitle>
          <CardDescription data-testid="email-description">
            {email.short_description}
          </CardDescription>
        </CardHeader>
        <CardFooter data-testid="email-date">
          <p className="text-sm font-normal text-text">
            {formatDate(email.date)}

            <span className="text-accent text-xs">
              {email.favourite ? "Favourite" : ""}
            </span>
          </p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default EmailCard;
