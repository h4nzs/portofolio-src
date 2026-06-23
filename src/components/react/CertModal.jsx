const CertModal = ({ img, onClose }) => {
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <div className="relative p-1 border border-cyan-500/50">
        <img src={img} alt="" className="max-w-full max-h-[90vh] shadow-2xl border border-white/10" />
        <div className="absolute -top-2 -right-2 p-2 bg-cyan-500 text-black font-bold text-xs font-mono">X</div>
      </div>
    </div>
  );
};

export default CertModal;
