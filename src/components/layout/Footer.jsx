
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Facebook, Linkedin, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();

      const socialLinks = [
        { icon: <Facebook className="h-6 w-6" />, href: '#', label: 'Facebook' },
        { icon: <Linkedin className="h-6 w-6" />, href: '#', label: 'LinkedIn' },
        { icon: <Instagram className="h-6 w-6" />, href: '#', label: 'Instagram' },
        { icon: <Youtube className="h-6 w-6" />, href: '#', label: 'YouTube' },
      ];

      const quickLinks = [
        { to: '/sobre', label: 'Sobre Nós' },
        { to: '/servicos', label: 'Serviços' },
        { to: '/cases', label: 'Cases de Sucesso' },
        { to: '/blog', label: 'Blog' },
        { to: '/contato', label: 'Contato' },
        { to: '/admin', label: 'Admin' },
      ];

      return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <Link to="/" className="flex items-center space-x-2 mb-4">
                  <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/55eba1e7a1514483f4fad51f97d0d117.jpg" alt="EDCAP Logo" className="h-12" />
                  <span className="text-2xl font-lato font-bold">EDCAP</span>
                </Link>
                <p className="text-sm text-blue-200 leading-relaxed">
                  Transformando desafios empresariais em resultados consistentes para pequenas e médias empresas.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-semibold font-lato mb-4 text-edcap-orange">Links Rápidos</h5>
                <ul className="space-y-2">
                  {quickLinks.map(link => (
                    <li key={link.to}>
                      <Link to={link.to} className="text-blue-200 hover:text-edcap-orange transition-colors duration-300 text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold font-lato mb-4 text-edcap-orange">Contato</h5>
                <ul className="space-y-3 text-sm text-blue-200">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-edcap-orange flex-shrink-0" />
                    <span>Av. Exemplo, 1234, Sala 56 - São Paulo, SP</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-edcap-orange flex-shrink-0" />
                    <a href="tel:+5511999999999" className="hover:text-edcap-orange transition-colors duration-300">(11) 99999-9999</a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-edcap-orange flex-shrink-0" />
                    <a href="mailto:contato@edcap.com.br" className="hover:text-edcap-orange transition-colors duration-300">contato@edcap.com.br</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold font-lato mb-4 text-edcap-orange">Siga-nos</h5>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-edcap-orange transition-colors duration-300">
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-sm text-blue-200">
                  Receba insights e novidades diretamente no seu email.
                </p>
                <form className="mt-2 flex">
                  <input type="email" placeholder="Seu email" className="px-3 py-2 rounded-l-md text-sm text-gray-800 focus:ring-edcap-orange focus:border-edcap-orange flex-grow" />
                  <button type="submit" className="bg-edcap-orange text-white px-4 py-2 rounded-r-md hover:bg-edcap-orange/90 transition-colors duration-300 text-sm">
                    Inscrever
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-blue-700 pt-8 text-center">
              <p className="text-sm text-blue-300">
                &copy; {currentYear} EDCAP Consultoria e Gestão. Todos os direitos reservados.
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Desenvolvido com <span role="img" aria-label="coração">❤️</span> por Hostinger Horizons
              </p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  