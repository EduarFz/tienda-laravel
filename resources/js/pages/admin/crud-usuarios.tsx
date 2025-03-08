import AdminLayout from '@/layouts/admin-layout';
import React from 'react';

const CrudUsuarios: React.FC = () => {
    return (
        <AdminLayout>
           <div class="bg-white w-full py-6">
  <div class="flex justify-center">
    <form class="bg-white p-6 rounded-2xl shadow-lg w-96">
      <h2 class="text-xl font-semibold text-center mb-4">Crear Usuario Nuevo</h2>
      <div class="grid grid-cols-2 gap-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre" 
          class="p-2 border rounded-lg w-full" 
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          class="p-2 border rounded-lg w-full" 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          class="p-2 border rounded-lg w-full" 
          required
        />
        <select 
          name="role" 
          class="p-2 border rounded-lg w-full"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button 
        type="submit" 
        class="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Crear Usuario Nuevo
      </button>
    </form>
  </div>
</div>

        </AdminLayout>
    );
};

export default CrudUsuarios;
