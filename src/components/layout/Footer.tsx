export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/[0.06] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-stellar-white/60">
          © {new Date().getFullYear()} Willyb0t
        </p>
      </div>
    </footer>
  );
}
