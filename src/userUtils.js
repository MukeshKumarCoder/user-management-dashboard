export const mapUser = (user) => {
  const fullName =
    user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const [firstName, lastName] = fullName.split(" ");

  return {
    id: user.id,
    firstName: firstName || "",
    lastName: lastName || "",
    email: user.email || "",
    department: user.company?.name || "",
  };
};

// Apply search + filters
export const filterUsers = (users, searchQuery, filters) => {
  return users
    .filter(
      (u) =>
        u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((u) => {
      const firstNameMatch = u.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase());
      const lastNameMatch = u.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase());
      const emailMatch = u.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());
      const deptMatch = u.department
        .toLowerCase()
        .includes(filters.department.toLowerCase());
      return firstNameMatch && lastNameMatch && emailMatch && deptMatch;
    });
};

// Paginate
export const paginate = (users, currentPage, itemsPerPage) => {
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  return users.slice(indexOfFirst, indexOfLast);
};
