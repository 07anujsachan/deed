import Footer from "../components/Footer";
import MentorHeader from "./components/MentorHeader";

export default function MentorLayout({ children }) {
  return (
    <div className="min-h-screen">
      <MentorHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
