import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import AddModal from "../../components/add/Add";
import "./Users.scss";
import { userRows } from "../../data";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => (
      <img src={params.row.img || "/noavatar.png"} alt="" />
    ),
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Record<string, any> | null>(null); // For editing

  // Handle Delete User API
  const handleDeleteApi = async (id: number) => {
    try {
      console.log(`Deleting user with ID: ${id}`);
      toast.success(`Deleted user with ID: ${id}`);
      // Replace with actual API call
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // Handle Add or Edit User Logic
  const handleAdd = (data: Record<string, any>) => {
    if (editData) {
      console.log("Updated User Data: ", data);
      toast.success("User updated successfully");
      // Update logic (e.g., API call or state update)
    } else {
      console.log("New User Data: ", data);
      toast.success("User added successfully");
      // Add logic (e.g., API call or state update)
    }
    setEditData(null); // Clear edit data after submission
  };

  // Handle Edit User
  const handleEdit = (row: Record<string, any>) => {
    setEditData(row); // Set the selected row data for editing
    setOpen(true); // Open the modal
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={userRows}
        handleDeleteApi={handleDeleteApi}
        handleEdit={handleEdit} // Pass edit handler
      />
      <AddModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null); // Reset editData on modal close
        }}
        onSubmit={handleAdd}
        title={editData ? "Edit User" : "Add New User"}
        columns={columns}
        btnName={editData ? "Update User" : "Add User"}
        initialData={editData || undefined} // Pass initial data for editing
      />
    </div>
  );
};

export default Users;
