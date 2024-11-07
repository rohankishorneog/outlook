import { Email } from "@/types/types";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchEmailBody, togglefavourite } from "@/store/emailSlice";
import { Avatar } from "../ui/avatar";
import { formatDate } from "@/utils";

interface SelectedEmail {
  email: Email;
  handleBack: () => void;
}

const SelectedEmail = ({ email, handleBack }: SelectedEmail) => {
  const dispatch = useAppDispatch();
  const { emailBody } = useAppSelector((state) => state.emails);

  const toggleMailFavourite = (emailId: string) => {
    dispatch(togglefavourite(emailId));
  };

  useEffect(() => {
    dispatch(fetchEmailBody(email.id));
  }, [dispatch, email.id]);
  return (
    <div
      className={
        " w-full lg:w-2/3 border-border border max-h-full rounded-xl overflow-y-auto"
      }
    >
      <Button onClick={handleBack}>Back</Button>
      <div className="flex p-10 gap-5">
        <Avatar className=" bg-accent size-12 flex items-center justify-center">
          {email.from.name[0]}
        </Avatar>

        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl">{email.subject}</h2>

            <Button
              className={` rounded-xl ${
                email.favourite ? "bg-gray-700" : "bg-accent"
              }`}
              onClick={() => toggleMailFavourite(email.id)}
            >
              {email.favourite ? "Undo Favourite" : "Mark as Favourite"}
            </Button>
          </div>

          <p className="mt-4">{formatDate(email.date)}</p>

          {emailBody && (
            <div
              dangerouslySetInnerHTML={{ __html: emailBody.body }}
              className="mt-10"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedEmail;
