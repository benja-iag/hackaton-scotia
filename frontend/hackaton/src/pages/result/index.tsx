import { Header } from "@/components/Header";
import { MailResponse } from "@/types/types";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";

type ResultProps = {
  mailResponse: MailResponse[];
};
export default function Result({ mailResponse }: ResultProps) {
  return (
    <>
      <Grid container spacing={2} columns={12}>
        {mailResponse.map((mail) => (
          <>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Asunto: {mail.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    De: {mail.from} {<br></br>}
                    Para: {mail.to}
                  </Typography>
                  <Typography variant="body1">cuerpo: {mail.body}</Typography>
                  <Typography variant="h6">Respuesta Automática:</Typography>
                  <Typography variant="body2">
                    {mail.generatedResponse}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} alignContent={"center"}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Email generado
                  </Typography>
                  <Typography variant="body2">
                    {mail.generatedResponse}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
