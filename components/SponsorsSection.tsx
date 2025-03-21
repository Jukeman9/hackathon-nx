export default function SponsorsSection() {
  return (
    <section id="sponsors" className="section py-20">
      <div className="container mx-auto px-4">
        <h2 className="gradient-text text-center md:text-left section-title" data-text="Our Sponsors">Our Sponsors</h2>
        <div className="sponsor-grid">
          <div className="sponsor-card">
            <h3>Supabase</h3>
            <p>Free real-time DB for your hack</p>
          </div>
          <div className="sponsor-card">
            <h3>Netlify</h3>
            <p>Deploy instantly with edge integration</p>
          </div>
          <div className="sponsor-card">
            <h3>Cloudflare</h3>
            <p>Edge-native infrastructure</p>
          </div>
          <div className="sponsor-card">
            <h3>Sentry</h3>
            <p>Error tracking & monitoring</p>
          </div>
          <div className="sponsor-card">
            <h3>ElevenLabs</h3>
            <p>AI-powered voice generation</p>
          </div>
          <div className="sponsor-card">
            <h3>Exa</h3>
            <p>Advanced AI capabilities</p>
          </div>
          <div className="sponsor-card">
            <h3>Loops</h3>
            <p>Email for modern software companies</p>
          </div>
          <div className="sponsor-card">
            <h3>Algorand</h3>
            <p>Blockchain for the next billion users</p>
          </div>
        </div>
      </div>
    </section>
  );
}