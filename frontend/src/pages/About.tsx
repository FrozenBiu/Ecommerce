import Footer from "@/components/Footer";
import Navigate from "@/components/Navigate";
import { BadgeCheck, Sprout, UsersRound } from "lucide-react";

const About = () => {
  return (
    <>
      <Navigate />
      <main>
        {/* <!-- Hero Headline --> */}
        <section className="pt-24 pb-16">
          <div className="max-w-[960px] mx-auto text-center px-4">
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4 block">
              A Journey of Purpose
            </span>
            <h1 className="text-primary dark:text-white tracking-tight text-6xl md:text-7xl font-bold leading-tight">
              Our Story
            </h1>
          </div>
        </section>
        {/* <!-- Mission & Quality Section --> */}
        <section className="py-20">
          <div className="max-w-375 mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Crafting a New Era of Consumption
                </h2>
                <p className="text-lg text-[#514d99] dark:text-gray-400 leading-relaxed">
                  We believe in the power of conscious consumption. Our brand
                  was born from a desire to merge modern aesthetics with lasting
                  durability. Every piece is crafted with intention and a
                  commitment to the highest standards.
                </p>
                <p className="text-lg text-[#514d99] dark:text-gray-400 leading-relaxed">
                  Our process begins with ethically sourced materials and ends
                  in the hands of artisans who value precision. We don't just
                  sell products; we curate experiences that fit seamlessly into
                  the rhythm of your modern life.
                </p>
                <div className="pt-4">
                  <div className="p-6 bg-white dark:bg-white/5 border border-[#e8e7f3] dark:border-white/10 rounded-xl">
                    <p className="italic text-lg font-medium">
                      "Simplicity is the ultimate sophistication, and quality is
                      its foundation."
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div
                  className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover rounded-2xl shadow-2xl shadow-primary/10 bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuCIkMShYQds85AiLpVtfdJIJXEeEBEnXogJcBp4pdcsWH_5AsqmFfGMQh0gnPvYQsxz-uJj-uHykTqfjt2YwwqkqXZoRDngR75xT_vXVfqat10fAP2TMr6gn-OGd_sHkyfJHNZqE0FuW_lt3acA8OXE4mwd_aUal8uCB26s_J7MD4ixhA8UABfTM6DSygLM8X6HjEem_z0KkdCEYdxyX6OQFXfzYmSFmVmSHQAKtdqeKb8TSR8N1z5IeFl61y-0SSQALmyphTEXFO-C)]"
                  data-alt="Minimalist lifestyle photo of a clean workspace with premium accessories"
                ></div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Values Grid Section --> */}
        <section className="py-24 bg-white dark:bg-[#151625]">
          <div className="max-w-375 mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Core Values</h2>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* <!-- Sustainability --> */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-[#e8e7f3] dark:border-white/10 hover:border-primary transition-colors group">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    <Sprout />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Sustainability</h3>
                  <p className="text-[#514d99] dark:text-gray-400 text-sm leading-relaxed">
                    Eco-friendly practices in every step, from plastic-free
                    packaging to low-carbon shipping.
                  </p>
                </div>
              </div>
              {/* <!-- Quality --> */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-[#e8e7f3] dark:border-white/10 hover:border-primary transition-colors group">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    <BadgeCheck />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Quality</h3>
                  <p className="text-[#514d99] dark:text-gray-400 text-sm leading-relaxed">
                    Premium materials that last a lifetime. We focus on
                    durability over disposable trends.
                  </p>
                </div>
              </div>
              {/* <!-- Community --> */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl border border-[#e8e7f3] dark:border-white/10 hover:border-primary transition-colors group">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    <UsersRound />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Community</h3>
                  <p className="text-[#514d99] dark:text-gray-400 text-sm leading-relaxed">
                    Building a home for the young audience. We listen, adapt,
                    and grow together with our users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Meet the Team Section --> */}
        <section className="py-24">
          <div className="max-w-375 mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-16">Meet the Visionaries</h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {/* <!-- Team Member 1 --> */}
              <div className="flex flex-col items-center gap-4">
                <div className="size-40 rounded-full border-4 border-white dark:border-white/10 shadow-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <div
                    className="w-full h-full bg-center bg-cover bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuA3MMzvQM_Tcjyead4WLpgQZjMswcuOEU2PEbYMglvm3qZ0NdZFjvo6lFH9eAAmVp9oOS5Rj-JfuzBMqPoYGy4MRe7cmlnT_pRPn_g0MIZVCgsXhx6j3BSO8QTcx7M36i83Y-tKDQPeICWtA6ZR3MUXAlumy2nyf3q2KHPiFXHWC2OB0JutuNQnQyi8NluZfjMDubLTO8sZtkCumXKr_HuxbdubY57l8aPfSLEItLYxkW8V-HUYgNH6YNby6sNQjZjdPG2Beg2GUtTH)]"
                    data-alt="Portrait of Alex, the brand founder"
                  ></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Alex Rivera</h4>
                  <p className="text-primary text-sm font-medium">
                    Founder &amp; CEO
                  </p>
                </div>
              </div>
              {/* <!-- Team Member 2 --> */}
              <div className="flex flex-col items-center gap-4">
                <div className="size-40 rounded-full border-4 border-white dark:border-white/10 shadow-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <div
                    className="w-full h-full bg-center bg-cover bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuCafIXkUbGF5kAMcu394hOzNkkjk7Rs-JnUnSaZi5m78e8rY46s0O5OLNH-seHC3N7DC6YzEKlkKlbUUia_NrOUaySOqs4Qhtobe-x2xBzruTkLI48Koeji4RB_pPqstpXd2XrylVKwrpU0VbRHwlamkPxmjr98HCeoT_AiBSfc_9L6RIzDWyR3_gzRg2GPL31cIcpHQPHfQf0d30TTC7XIrPuPanMg0tq66PYITAt08NlDRGEEKuqflvTjppI_IcPioGZGY3mIk9Zj)]"
                    data-alt="Portrait of Jordan, head of design"
                  ></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Jordan Lee</h4>
                  <p className="text-primary text-sm font-medium">
                    Creative Director
                  </p>
                </div>
              </div>
              {/* <!-- Team Member 3 --> */}
              <div className="flex flex-col items-center gap-4">
                <div className="size-40 rounded-full border-4 border-white dark:border-white/10 shadow-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <div
                    className="w-full h-full bg-center bg-cover bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuDe6BsgYlaQ3A3HfKORaVDOGDhNrnTELOtyKhIhd242w0J_94jxrgnc8iy3Kt1OdEdIGXrmR5Wq24Y05ybacH62V8gpGRq8ETwqjriKb_Xz3sPnf6ZxX9dmCacyEnpU0PRZ1sN0XsSB8wh4zXE5a5EZ3HXAqBgmzd50D3KSN5SVb-BZpUmBEhFAiA7aBZi2O81bbKBJmR5Mhvc1ZP4zZrFIrkLCZHWME_63weU5P4hhQrtFHA2yNPMkRacwi5Dg06VzoxbGpgyBvl3A)]"
                    data-alt="Portrait of Sarah, operations manager"
                  ></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Sarah Chen</h4>
                  <p className="text-primary text-sm font-medium">
                    Operations Lead
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- CTA Section --> */}
        <section className="pb-24 px-6">
          <div className="max-w-375 mx-auto bg-primary rounded-[2rem] p-12 md:p-20 text-center text-white overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to join our community?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Experience the difference of thoughtfully designed goods. Browse
                our latest collection today.
              </p>
              <a
                href="/products"
                className="bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform"
              >
                Explore Shop
              </a>
            </div>
            {/* <!-- Abstract Design Elements --> */}
            <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-64 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
