import React from "react";

export default function MemberPermissionItem({
  id,
  username,
  isAdmin,
  onChange,
}) {
  return (
    <tr>
      <td>{username}</td>
      <td>
        <select
          defaultValue={isAdmin ? "admin" : "member"}
          onChange={onChange.bind(null, id)}
        >
          <option value="admin">admin</option>
          <option value="member">member</option>
        </select>
      </td>
    </tr>
  );
}
