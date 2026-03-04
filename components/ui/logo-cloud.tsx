'use client';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
  title?: string;
  subtitle?: string;
};

export function LogoCloud({ className, logos, title, subtitle, ...props }: LogoCloudProps) {
  return (
    <div {...props} className={cn('relative mx-auto w-full max-w-5xl py-12 px-4', className)}>
      {/* Radial glow top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vmin',
          height: '60vmin',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08), transparent 60%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        {(title || subtitle) && (
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 500,
            letterSpacing: '-0.3px',
            marginBottom: 20,
            lineHeight: 1.4,
          }}>
            {title && <span style={{ color: 'rgba(255,255,255,0.4)' }}>{title}</span>}
            {title && subtitle && <br />}
            {subtitle && <span style={{ color: '#fff', fontWeight: 700 }}>{subtitle}</span>}
          </h2>
        )}


        {/* Slider */}
        <div style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          overflow: 'hidden',
          padding: '12px 0',
        }}>
          <InfiniteSlider gap={56} speed={60} speedOnHover={25}>
            {logos.map((logo) => (
              <img
                key={`logo-${logo.alt}`}
                alt={logo.alt}
                src={logo.src}
                loading="lazy"
                style={{
                  height: 20,
                  width: 'auto',
                  opacity: 0.5,
                  filter: 'brightness(0) invert(1)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  flexShrink: 0,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.8'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.5'; }}
              />
            ))}
          </InfiniteSlider>
        </div>

      </div>
    </div>
  );
}
