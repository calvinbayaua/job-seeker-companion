import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function ApplicationsTable(props) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: 2 }}>Job Applications</Typography>
      <Table>
        <TableHead>
            <TableRow>
                <TableCell><b>Company</b></TableCell>
                <TableCell><b>Job Title</b></TableCell>
                <TableCell><b>Location</b></TableCell>
                <TableCell><b>Date</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.applications.map((app) => (
                <TableRow key={app.id}>
                    <TableCell>{app.companyName}</TableCell>
                    <TableCell>{app.jobTitle}</TableCell>
                    <TableCell>{app.location}</TableCell>
                    <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
