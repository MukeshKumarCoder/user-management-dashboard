import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";
import FilterModal from "../components/FilterModal";
import Pagination from "../components/Pagination";
import { getUsers, addUser, updateUser, deleteUser } from "../api";
import { mapUser, filterUsers, paginate } from "../userUtils.js";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data.map(mapUser));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add/Edit
  const handleUserSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        company: { name: data.department }, 
      };

      if (editingUser) {
        const res = await updateUser(editingUser.id, payload);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? mapUser(res.data) : u))
        );
        toast.success("User updated successfully");
      } else {
        const res = await addUser(payload);
        setUsers((prev) => [...prev, mapUser(res.data)]);
        toast.success("User added successfully");
      }

      setIsUserModalOpen(false);
      setEditingUser(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  // Filtering + Pagination
  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery, filters),
    [users, searchQuery, filters]
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = useMemo(
    () => paginate(filteredUsers, currentPage, itemsPerPage),
    [filteredUsers, currentPage, itemsPerPage]
  );

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="spinner"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-1rem)] pb-4 bg-gray-100 relative">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddUser={() => {
          setEditingUser(null);
          setIsUserModalOpen(true);
        }}
        onFilter={() => setIsFilterOpen(true)}
      />

      <div className="w-full max-w-7xl mx-auto mt-6 px-4">
        {currentUsers.length > 0 ? (
          <UserList
            users={currentUsers}
            onEdit={(user) => {
              setEditingUser(user);
              setIsUserModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleUserSubmit}
        editingUser={editingUser}
      />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
