
    import React from 'react';

    const AdminFooter = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="border-t bg-background text-secondary text-sm py-4 px-6 text-center md:text-left">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} EDCAP Consultoria. Todos os direitos reservados.</p>
            <p>Painel Administrativo</p>
          </div>
        </footer>
      );
    };

    export default AdminFooter;
  