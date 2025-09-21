import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition transform flex flex-col justify-between w-full"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600 text-sm truncate">
              <span className="font-medium">ID:</span> {user.id}
            </p>
            <p className="text-gray-600 text-sm truncate">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 text-sm mb-4 truncate">
              <span className="font-medium">Department:</span>{" "}
              {user.department || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 gap-2 mt-3">
            <button
              onClick={() => onEdit(user)}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
