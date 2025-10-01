const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo + Infos */}
        <div>
          <h3 className="text-xl font-bold text-white">MBINEKO</h3>
          <p className="mt-4 text-sm">
            © {new Date().getFullYear()} MBINEKO. Tous droits réservés.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white">Navigation</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#features" className="hover:text-green-400">Fonctionnalités</a></li>
            <li><a href="#impacts" className="hover:text-green-400">Impacts</a></li>
            <li><a href="#team" className="hover:text-green-400">Équipe</a></li>
            <li><a href="#about" className="hover:text-green-400">À propos</a></li>
            <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <p className="mt-4">Orange Digital Center, Douala</p>
          <p>+237 696543242</p>
          <p>mbineko@gmail.com</p>
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>Développé avec ❤️ par MBINEKO</p>
      </div>
    </footer>
  );
};

export default Footer;
