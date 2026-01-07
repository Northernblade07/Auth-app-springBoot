import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShieldCheck,
  Fingerprint,
  Lock,
  Zap,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
}

const Home = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 dark:from-primary/20 via-transparent to-transparent blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Secure Authentication <br />
            <span className="text-primary">Built for the Future</span>
          </h1>

          <p className="mt-6 text-muted-foreground text-lg">
            Authify provides fast, secure, and scalable authentication for
            modern applications.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Authentication, Reinvented
          </h2>
          <p className="text-muted-foreground mt-4">
            Everything you need to secure your app — nothing you don’t.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="h-full hover:shadow-[0_0_25px_rgba(0,0,0,0.80)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition border border-border">
                <CardContent className="p-6 space-y-4">
                  <f.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-16"
          >
            Simple. Secure. Seamless.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center space-y-4"
              >
                <div className="mx-auto ring-1 ring-primary/20 h-12 w-12 rounded-xl bg-primary/15 dark:bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="py-24 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ShieldCheck className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-3xl font-bold mt-6">
            Enterprise-Grade Security
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built with modern cryptography, token-based authentication,
            and best security practices from day one.
          </p>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 relative text-center px-4">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/20 dark:from-primary/10 via-transparent to-transparent blur-2xl" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl font-bold">
            Start Securing Your App Today
          </h2>
          <p className="mt-4 text-muted-foreground">
            Launch authentication in minutes, not weeks.
          </p>

          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-6 text-center text-sm text-muted-foreground bordet-t border-border">
        © {new Date().getFullYear()} Authify. All rights reserved.
      </footer>
    </main>
  )
}

export default Home

/* ================= DATA ================= */

const features = [
  {
    title: "Secure by Default",
    description: "Industry-standard encryption and token-based auth.",
    icon: Lock,
  },
  {
    title: "Biometric Ready",
    description: "Support for fingerprint & modern auth flows.",
    icon: Fingerprint,
  },
  {
    title: "Fast Integration",
    description: "Drop-in auth that works instantly.",
    icon: Zap,
  },
  {
    title: "Reliable Protection",
    description: "Built to scale with your users.",
    icon: ShieldCheck,
  },
]

const steps = [
  {
    title: "Create Account",
    description: "Sign up securely in seconds.",
    icon: Fingerprint,
  },
  {
    title: "Authenticate",
    description: "Login using secure credentials.",
    icon: Lock,
  },
  {
    title: "Access Granted",
    description: "Tokens verified, access approved.",
    icon: ShieldCheck,
  },
]
