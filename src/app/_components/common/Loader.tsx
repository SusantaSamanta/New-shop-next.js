"use client";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div
        className="glitch text-3xl font-bold tracking-[0.3em] text-foreground"
        data-glitch="Loading..."
      >
        Loading...
      </div>

      <style jsx>{`
        .glitch {
          position: relative;
          animation: shift 1s ease-in-out infinite alternate;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-glitch);
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.8;
        }

        .glitch::before {
          color: #8b5cf6;
          z-index: -1;
          animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        .glitch::after {
          color: #22c55e;
          z-index: -2;
          animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse
            infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes shift {
          0%,
          40%,
          44%,
          58%,
          61%,
          65%,
          69%,
          73%,
          100% {
            transform: skewX(0deg);
          }

          41% {
            transform: skewX(10deg);
          }

          42% {
            transform: skewX(-10deg);
          }

          59% {
            transform: skewX(40deg) skewY(10deg);
          }

          60% {
            transform: skewX(-40deg) skewY(-10deg);
          }

          63% {
            transform: skewX(10deg) skewY(-5deg);
          }

          70% {
            transform: skewX(-50deg) skewY(-20deg);
          }

          71% {
            transform: skewX(10deg) skewY(-10deg);
          }
        }
      `}</style>
    </div>
  );
}