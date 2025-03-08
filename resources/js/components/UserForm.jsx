import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const UserForm = () => {
  const { users } = usePage().props;
  const { data, setData, post, processing } = useForm({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/users");
  };

  return (
    <div className="bg-white w-full py-6">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <h2 className="text-xl font-semibold text-center mb-4">Crear Usuario Nuevo</h2>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name" 
              value={data.name} 
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Nombre" 
              className="p-2 border rounded-lg w-full" 
              required
            />
            <input 
              type="email" 
              name="email" 
              value={data.email} 
              onChange={(e) => setData("email", e.target.value)}
              placeholder="Email" 
              className="p-2 border rounded-lg w-full" 
              required
            />
            <input 
              type="password" 
              name="password" 
              value={data.password} 
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Contraseña" 
              className="p-2 border rounded-lg w-full" 
              required
            />
            <select 
              name="role" 
              value={data.role} 
              onChange={(e) => setData("role", e.target.value)}
              className="p-2 border rounded-lg w-full"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            disabled={processing}
          >
            Crear Usuario Nuevo
          </button>
        </form>
      </div>
      
      {/* Tabla de Usuarios */}
      {users.length > 0 && (
        <div className="mt-6 px-10">
          <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Rol</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border">
                  <td className="border p-2 text-center">{user.id}</td>
                  <td className="border p-2 text-center">{user.name}</td>
                  <td className="border p-2 text-center">{user.email}</td>
                  <td className="border p-2 text-center">{user.role}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">Update</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserForm;
