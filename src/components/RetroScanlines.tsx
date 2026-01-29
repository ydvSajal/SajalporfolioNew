const RetroScanlines = () => {
  return (
    <>
      {/* CRT Scanlines Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Vignette Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </>
  );
};

export default RetroScanlines;
