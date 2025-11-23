import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6 border-r">
        <h2 className="text-xl font-bold mb-6">Panel Admin</h2>

        <nav className="space-y-3">
          <a className="block p-2 rounded hover:bg-gray-200 cursor-pointer">Dashboard</a>
          <a className="block p-2 rounded hover:bg-gray-200 cursor-pointer">Usuarios</a>
          <a className="block p-2 rounded hover:bg-gray-200 cursor-pointer">Importadores</a>
          <a className="block p-2 rounded hover:bg-gray-200 cursor-pointer">Productos</a>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bienvenido, Administrador</h1>
          <p className="text-gray-600">
            Sesión como: <span className="font-semibold">{user?.identifier}</span>
          </p>
        </header>

        {/* STATS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Usuarios Registrados</h3>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Importadores</h3>
            <p className="text-3xl font-bold mt-2">32</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-600">Productos Activos</h3>
            <p className="text-3xl font-bold mt-2">543</p>
          </div>
        </section>

        {/* TABLE EXAMPLE */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Últimos Registros</h2>

          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Fecha</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="p-3">1</td>
                  <td className="p-3">Usuario</td>
                  <td className="p-3">María Pérez</td>
                  <td className="p-3">22 Nov 2025</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3">2</td>
                  <td className="p-3">Importador</td>
                  <td className="p-3">Ferretec Ltda.</td>
                  <td className="p-3">22 Nov 2025</td>
                </tr>

                <tr>
                  <td className="p-3">3</td>
                  <td className="p-3">Producto</td>
                  <td className="p-3">Detector Gas X12</td>
                  <td className="p-3">21 Nov 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AdminDashboard;
