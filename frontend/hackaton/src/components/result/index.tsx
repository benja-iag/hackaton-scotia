import { Header } from "@/components/Header";
import { MailResponse } from "@/types/types";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";

type ResultProps = {
  mailResponse: MailResponse[];
};
export default function Result({ mailResponse }: ResultProps) {
  const [color, setColor] = React.useState<string>("");
  return (
    <>
      <Grid container spacing={2} columns={12}>
        {mailResponse.map((mail) => (
          <>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Email del cliente
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Asunto: {mail.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    De: {mail.from} {<br></br>}
                    Para: {mail.to}
                  </Typography>
                  <Typography variant="body1">cuerpo: {mail.body}</Typography>
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
                    Email generado - Tipo de urgencia: {mail.classification }
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {mail.generatedResponse &&
                      JSON.parse(mail.generatedResponse).text}
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
