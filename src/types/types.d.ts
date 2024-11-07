export interface EmailSender {
  email: string;
  name: string;
}

export interface Email {
  id: string;
  from: EmailSender;
  date: number;
  subject: string;
  short_description: string;
  read:boolean
  favourite:boolean
}

export interface EmailBody {
  id: string;
  body: string;
}

export interface EmailList {
  list: Email[];
  total: number;
}
