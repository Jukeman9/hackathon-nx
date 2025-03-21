export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-20 section z-10">
      <div className="container mx-auto px-4 relative z-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center gradient-text section-title scramble-on-hover" data-text="Schedule">
          Schedule
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 schedule-grid">
            <div className="schedule-card group" data-day="01">
              <div className="data-line"></div>
              <div className="content-wrapper">
                <div className="day-indicator group-hover:scale-105 transition-transform">DAY.01</div>
                <h3 className="text-xl font-bold mb-3 schedule-title">Opening Ceremony & Team Formation</h3>
                <p className="schedule-text">
                  <span className="time-stamp group-hover:text-opacity-100">[09:00]</span> Registration & Check-in<br />
                  <span className="time-stamp group-hover:text-opacity-100">[10:00]</span> Opening Keynote<br />
                  <span className="time-stamp group-hover:text-opacity-100">[11:30]</span> Team Formation Workshop<br />
                  <span className="time-stamp group-hover:text-opacity-100">[13:00]</span> Networking Lunch
                </p>
              </div>
            </div>

            <div className="schedule-card group" data-day="02">
              <div className="data-line"></div>
              <div className="content-wrapper">
                <div className="day-indicator group-hover:scale-105 transition-transform">DAY.02-03</div>
                <h3 className="text-xl font-bold mb-3 schedule-title">Hacking & Development</h3>
                <p className="schedule-text">
                  <span className="time-stamp group-hover:text-opacity-100">[24H]</span> Continuous Hacking<br />
                  <span className="time-stamp group-hover:text-opacity-100">[00:00]</span> Midnight Workshops<br />
                  <span className="time-stamp group-hover:text-opacity-100">[12:00]</span> Mentor Sessions<br />
                  <span className="time-stamp group-hover:text-opacity-100">[18:00]</span> Progress Check-ins
                </p>
              </div>
            </div>

            <div className="schedule-card group" data-day="04">
              <div className="data-line"></div>
              <div className="content-wrapper">
                <div className="day-indicator group-hover:scale-105 transition-transform">DAY.04</div>
                <h3 className="text-xl font-bold mb-3 schedule-title">Project Submissions & Judging</h3>
                <p className="schedule-text">
                  <span className="time-stamp group-hover:text-opacity-100">[10:00]</span> Submission Deadline<br />
                  <span className="time-stamp group-hover:text-opacity-100">[11:00]</span> Project Presentations<br />
                  <span className="time-stamp group-hover:text-opacity-100">[14:00]</span> Judging Rounds<br />
                  <span className="time-stamp group-hover:text-opacity-100">[16:00]</span> Final Evaluations
                </p>
              </div>
            </div>

            <div className="schedule-card group" data-day="05">
              <div className="data-line"></div>
              <div className="content-wrapper">
                <div className="day-indicator group-hover:scale-105 transition-transform">DAY.05</div>
                <h3 className="text-xl font-bold mb-3 schedule-title">Awards Ceremony & Networking</h3>
                <p className="schedule-text">
                  <span className="time-stamp group-hover:text-opacity-100">[11:00]</span> Awards Ceremony<br />
                  <span className="time-stamp group-hover:text-opacity-100">[12:30]</span> Closing Keynote<br />
                  <span className="time-stamp group-hover:text-opacity-100">[13:30]</span> Networking Session<br />
                  <span className="time-stamp group-hover:text-opacity-100">[15:00]</span> Event Conclusion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}