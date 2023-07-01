export type MailResponse = {
  subject: string;
  from: string;
  to: string;
  body: string;
  generatedResponse: string;
  classification: number;
  done: string;
  created_at: string;
};
