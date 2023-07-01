import psycopg2


class MailRepository:
    def __init__(self, connection_string):
        self.connection_string = connection_string

    def save_mail(self, mail):
        with psycopg2.connect(self.connection_string) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO mails (id, sender, recipient, subject, body) "
                    "VALUES (%s, %s, %s, %s) RETURNING id",
                    (mail['sender'], mail['recipient'],
                     mail['subject'], mail['body'])
                )
                return cur.fetchone()[0]

    def get_mails(self):
        with psycopg2.connect(self.connection_string) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT * FROM mails"
                )
                return cur.fetchall()

    def get_mail_by_id(self, mail_id):
        with psycopg2.connect(self.connection_string) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT * FROM mails WHERE id = %s",
                    (mail_id,)
                )
                return cur.fetchone()

    def add_generated_response(self, mail_id, response):
        with psycopg2.connect(self.connection_string) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE mails SET generated_response = %s AND done=TRUE WHERE id = %s",
                    (response, mail_id)
                )
