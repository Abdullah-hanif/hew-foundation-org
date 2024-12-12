import { Box, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalCard from "../../pages/bloodDonars/horizontalCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bloodRequests = [
  {
    id: 1,
    name: "John Doe",
    bloodGroup: "O+",
    requiredDate: "2024-12-15",
    email: "john@example.com",
    phone: "123-456-7890",
    hospitalAddress: "City Hospital, Street 10",
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Smith",
    bloodGroup: "A-",
    requiredDate: "2024-12-20",
    email: "jane@example.com",
    phone: "987-654-3210",
    hospitalAddress: "Care Medical, Main Avenue",
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Michael Johnson",
    bloodGroup: "B+",
    requiredDate: "2024-12-18",
    email: "michael@example.com",
    phone: "555-123-4567",
    hospitalAddress: "Saint Mary's Hospital",
    city: "Chicago",
  },
];

export default function BloodDonorRequest() {
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: async (donorId: number) => {
      const response = await fetch(`/api/approve/${donorId}`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to approve the request");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Request Approved Successfully!");
      queryClient.invalidateQueries(["donorRequests"]);
      setSelectedDonor(null);
    },
    onError: () => {
      toast.error("Failed to Approve the Request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (donorId: number) => {
      const response = await fetch(`/api/reject/${donorId}`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to reject the request");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Request Rejected Successfully!");
      queryClient.invalidateQueries(["donorRequests"]);
      setSelectedDonor(null);
    },
    onError: () => {
      toast.error("Failed to Reject the Request");
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Blood Donor Requests
      </Typography>

      {/* Donor Cards Grid */}
      <Grid container spacing={3}>
        {bloodRequests.map((donor) => (
          <Grid item xs={12} sm={6} key={donor.id}>
            <HorizontalCard donor={donor} onViewDetails={setSelectedDonor} />
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Donor Details */}
      <Dialog
        open={!!selectedDonor}
        onClose={() => setSelectedDonor(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Blood Donor Details</Typography>
            <IconButton onClick={() => setSelectedDonor(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedDonor && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedDonor.name}
              </Typography>
              <Typography variant="body1">
                <strong>Blood Group:</strong> {selectedDonor.bloodGroup}
              </Typography>
              <Typography variant="body1">
                <strong>Required Date:</strong> {selectedDonor.requiredDate}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedDonor.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {selectedDonor.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Hospital Address:</strong> {selectedDonor.hospitalAddress}
              </Typography>
              <Typography variant="body1">
                <strong>City:</strong> {selectedDonor.city}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => approveMutation.mutate(selectedDonor.id)}
            disabled={approveMutation.isLoading}
          >
            {approveMutation.isLoading ? "Approving..." : "Approve"}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => rejectMutation.mutate(selectedDonor.id)}
            disabled={rejectMutation.isLoading}
          >
            {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
