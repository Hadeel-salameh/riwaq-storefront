import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[80svh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="font-display text-8xl text-gold sm:text-9xl">404</p>
        <h1 className="mt-8 font-display text-2xl text-sand sm:text-3xl">
          ضَلَلتَ الطريق بين الأروقة · Lost between the arcades
        </h1>
        <p className="mt-4 text-sm leading-7 text-sand-dim">
          الصفحة التي تبحث عنها غير موجودة.
          <br />
          The page you are looking for does not exist.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/ar" className="btn-gold">
            الرئيسية
          </Link>
          <Link href="/en" className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
