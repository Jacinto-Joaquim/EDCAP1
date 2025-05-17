
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Facebook, Linkedin, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

    const Footer = () => {
      const newLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2f61f8c6-d04f-40a4-b186-80009fcc29f3/2c6f50c5210ee06f70eb9b2f2ab95e54.png";
      const currentYear = new Date().getFullYear();

      const footerLinks = [
        { title: 'Empresa', links: [ { name: 'Sobre Nós', path: '/sobre' }, { name: 'Nossa Equipe', path: '/sobre#equipe' }, { name: 'Carreiras', path: '/contato' } ] },
        { title: 'Serviços', links: [ { name: 'Consultoria Estratégica', path: '/servicos#consultoria-estrategica' }, { name: 'Gestão de Projetos', path: '/servicos#gestao-projetos' }, { name: 'Desenvolvimento de Negócios', path: '/servicos#desenvolvimento-negocios' } ] },
        { title: 'Recursos', links: [ { name: 'Blog', path: '/blog' }, { name: 'Cases de Sucesso', path: '/cases' }, { name: 'FAQs', path: '/contato#faq' } ] },
      ];

      const socialMedia = [
        { name: 'Facebook', icon: <Facebook className="h-6 w-6" />, path: 'https://facebook.com/edcapconsultoria' },
        { name: 'LinkedIn', icon: <Linkedin className="h-6 w-6" />, path: 'https://linkedin.com/company/edcapconsultoria' },
        { name: 'Twitter', icon: <Twitter className="h-6 w-6" />, path: 'https://twitter.com/edcapconsultoria' },
        { name: 'Instagram', icon: <Instagram className="h-6 w-6" />, path: 'https://instagram.com/edcapconsultoria' },
      ];

      const contactInfo = [
        { icon: <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />, text: "Luanda, Viana, Angola" },
        { icon: <Phone className="h-5 w-5 mr-2 flex-shrink-0" />, text: "+244 9XX XXX XXX" },
        { icon: <Mail className="h-5 w-5 mr-2 flex-shrink-0" />, text: "info@edcapconsultoria.co.ao" },
      ];

      return (
        <footer className="bg-primary text-primary-foreground pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div className="space-y-4 md:col-span-2 lg:col-span-1">
                <Link to="/" className="inline-block">
                  <img  src={newLogoUrl} alt="EDCAP Consultoria Logo Rodapé" className="h-12 mb-2 filter brightness-0 invert" src="https://images.unsplash.com/photo-1501752382981-93226bd2e7af" />
                </Link>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  EDCAP Consultoria: Transformando desafios em oportunidades de crescimento para empresas em Angola.
                </p>
                <div className="flex space-x-4 pt-2">
                  {socialMedia.map((social) => (
                    <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300" aria-label={social.name}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {footerLinks.map((section) => (
                <div key={section.title}>
                  <p className="font-lato text-lg font-semibold text-primary-foreground mb-4">{section.title}</p>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.path} className="text-sm text-primary-foreground/80 hover:text-accent hover:underline transition-colors duration-300">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div>
                <p className="font-lato text-lg font-semibold text-primary-foreground mb-4">Contato Direto</p>
                <ul className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <li key={index} className="flex items-start text-sm text-primary-foreground/80">
                      {info.icon}
                      <span>{info.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-primary-foreground/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-primary-foreground/70 mb-4 md:mb-0">
                &copy; {currentYear} EDCAP Consultoria. Todos os direitos reservados.
              </p>
              <div className="flex space-x-4">
                <Link to="/politica-de-privacidade" className="text-primary-foreground/70 hover:text-accent hover:underline">Política de Privacidade</Link>
                <Link to="/contato#termos" className="text-primary-foreground/70 hover:text-accent hover:underline">Termos de Uso</Link>
              </div>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  