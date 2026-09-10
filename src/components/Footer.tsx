import { person, social } from "@/resources";
export const Footer = () => (
  <footer id="contact" className="contact-section">
    <div className="contact-top">
      <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
      <span className="eyebrow">BENGALURU, INDIA · OPEN TO ENGINEERING ROLES</span>
    </div>
    <a className="contact-title" href={"mailto:" + person.email}>
      LET’S BUILD<span aria-hidden="true">↗</span>
    </a>
    <div className="footer-bottom">
      <a href={"mailto:" + person.email}>{person.email}</a>
      <div className="footer-socials">
        {social
          .filter((item) => item.name !== "Email")
          .map((item) => (
            <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer">
              {item.name} ↗
            </a>
          ))}
      </div>
      <span>© {new Date().getFullYear()} DARSHAN H</span>
      <a href="#main" aria-label="Back to top">
        BACK TO TOP ↑
      </a>
    </div>
  </footer>
);
