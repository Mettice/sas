import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ──────────────────────────────────────────────
   AI Infrastructure Platforms — The Orchestration Layer
   Real, current frontier & open-weight models (Jan 2026)
────────────────────────────────────────────── */
const platforms = [
  {
    name: 'Anthropic Claude',
    tag: 'Reasoning · Coding · Long Context',
    model: 'Claude Sonnet 4.5 · Opus 4.5',
    color: '#CC785C',
    bg: 'rgba(204,120,92,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.479-.321.686.06 1.52.103 2.278.158 1.651.097 2.447.255h.389l.055-.158-.134-.096-.103-.097-2.358-1.6-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.146-.103.018-.07-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.418 1.002 2.228 1.555 3.032.456.898.243.832.091.255h.158V9.15l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.729-.82.85-.904.547-.431h1.033l.758.881-.34.911-1.064 1.353-.88 1.142-1.263 1.699-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.142-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.925.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.087-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI GPT-5.2',
    tag: 'Flagship Reasoning · Tools · Vision',
    model: 'GPT-5.2 · o4 · GPT-Image-1',
    color: '#10A37F',
    bg: 'rgba(16,163,127,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4069-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4997Z" />
      </svg>
    ),
  },
  {
    name: 'Google Gemini',
    tag: 'Multimodal · 2M Context · Realtime',
    model: 'Gemini 3 Pro · Nano Banana',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" />
      </svg>
    ),
  },
  {
    name: 'Meta Llama',
    tag: 'Open Weights · On-Prem · Finetune',
    model: 'Llama 4 · Llama 4 Scout',
    color: '#0866FF',
    bg: 'rgba(8,102,255,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M6.897 4C3.635 4 1 6.635 1 9.897v4.206C1 17.365 3.635 20 6.897 20c1.758 0 3.31-.782 4.397-1.996a5.92 5.92 0 0 0 1.706-3.931l.003-.277c.015-2.25-.02-4.557-1.007-6.435C10.892 5.255 9.18 4 6.897 4zm10.206 0c-2.283 0-3.995 1.255-5.1 3.361-.986 1.878-1.021 4.185-1.006 6.435l.003.277a5.92 5.92 0 0 0 1.706 3.93A5.885 5.885 0 0 0 17.103 20C20.365 20 23 17.365 23 14.103V9.897C23 6.635 20.365 4 17.103 4z" />
      </svg>
    ),
  },
  {
    name: 'Mistral AI',
    tag: 'European · Sovereign · Fast',
    model: 'Mistral Large 2 · Codestral',
    color: '#FA520F',
    bg: 'rgba(250,82,15,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M3.428 3.4h3.429v3.428H3.428V3.4zm13.714 0h3.43v3.428h-3.43V3.4zM3.428 6.828h6.857v3.429H3.428V6.828zm10.286 0h6.858v3.429h-6.858V6.828zM3.428 10.257h17.144v3.429H3.428v-3.429zM3.428 13.686h3.429v3.428H3.428v-3.428zm13.715 0h3.43v3.428h-3.43v-3.428zM3.428 17.114h6.857v3.429H3.428v-3.429zm10.287 0h6.857v3.429h-6.857v-3.429z" />
      </svg>
    ),
  },
  {
    name: 'NVIDIA',
    tag: 'GPU Ops · NIM · Triton Inference',
    model: 'H200 · B200 · DGX Cloud',
    color: '#76B900',
    bg: 'rgba(118,185,0,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.063-1.158-.185v-4.346c1.528.185 1.837.86 2.75 2.385l2.043-1.724s-1.49-1.955-4.004-1.955c-.275 0-.536.018-.798.048zm0-4.75v2.138c.141-.009.283-.023.424-.028 5.45-.185 9.007 4.47 9.007 4.47s-4.082 4.966-8.33 4.966c-.388 0-.752-.037-1.101-.098v1.323c.298.037.606.06.92.06 3.955 0 6.814-2.02 9.583-4.41.459.368 2.338 1.262 2.725 1.655-2.632 2.203-8.767 3.978-12.247 3.978-.336 0-.658-.019-.98-.05v1.86h15.018V4.048H8.948zm0 10.372v1.128c-3.656-.652-4.67-4.455-4.67-4.455s1.753-1.94 4.67-2.254v1.238h-.006c-1.532-.184-2.732 1.247-2.732 1.247s.675 2.42 2.738 3.096zM2.268 10.92s2.16-3.187 6.687-3.533V6.186C3.938 6.59 0 10.918 0 10.918s2.23 6.45 8.948 7.084v-1.272c-4.93-.62-6.68-5.81-6.68-5.81z" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    tag: 'Search-Grounded · Citations',
    model: 'Sonar Pro · Online RAG',
    color: '#20808D',
    bg: 'rgba(32,128,141,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M22.398 7.379l-6.169-4.798v4.399H7.62V2.58L1.45 7.38a.855.855 0 0 0 0 1.351l6.17 4.8V9.13h1.922v12.203l5.487-4.267v4.354l6.17-4.798a.855.855 0 0 0 0-1.35l-5.085-3.951 6.284-4.89a.855.855 0 0 0 0-1.352z" />
      </svg>
    ),
  },
  {
    name: 'xAI Grok',
    tag: 'Realtime X · Truth-seeking',
    model: 'Grok 4 · Grok Vision',
    color: '#FFFFFF',
    bg: 'rgba(255,255,255,0.04)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M9.27 15.29L15.15 8.73a.73.73 0 0 1 1.11 0l1.09 1.24a.73.73 0 0 1 0 .98l-5.88 6.55a.73.73 0 0 1-1.11 0l-1.09-1.23a.73.73 0 0 1 0-.98zM5.5 11.05l3.15 3.52a.73.73 0 0 0 1.1 0l1.1-1.24a.73.73 0 0 0 0-.98L7.7 8.83a.73.73 0 0 0-1.11 0L5.5 10.07a.73.73 0 0 0 0 .98zm9.98 4.3l1.82 2.04a.73.73 0 0 0 1.11 0l1.1-1.23a.73.73 0 0 0 0-.98l-1.83-2.04a.73.73 0 0 0-1.1 0l-1.1 1.23a.73.73 0 0 0 0 .98z" />
      </svg>
    ),
  },
  {
    name: 'Hugging Face',
    tag: '500k+ Models · Deploy on Prem',
    model: 'Spaces · TGI · Inference',
    color: '#FFD21E',
    bg: 'rgba(255,210,30,0.08)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-4.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4.5 3a4 4 0 0 0-3.46 2h6.92a4 4 0 0 0-3.46-2z" />
      </svg>
    ),
  },
  {
    name: 'Cohere',
    tag: 'Enterprise Retrieval · Rerank',
    model: 'Command R+ · Embed v4',
    color: '#39594D',
    bg: 'rgba(57,89,77,0.12)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d="M4.5 19.5a4.5 4.5 0 0 1 0-9h15a4.5 4.5 0 0 1 0 9h-15zm5.5-4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-5.5-8.5a4.5 4.5 0 0 1 4.5-4.5h6a4.5 4.5 0 0 1 0 9h-6a4.5 4.5 0 0 1-4.5-4.5z" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────────
   Platform card
────────────────────────────────────────────── */
const PlatformCard: React.FC<{ p: (typeof platforms)[0]; index: number }> = ({
  p,
  index,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse((m) => ({ ...m, active: false }))}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 p-6 h-full backdrop-blur-sm transition-all duration-500 hover:border-white/25"
      style={{ background: '#0b0d11' }}
      data-testid={`platform-card-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: mouse.active
            ? `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, ${p.color}22 0%, transparent 65%)`
            : 'transparent',
        }}
      />

      {/* Accent corner */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: p.color }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500"
            style={{
              background: p.bg,
              borderColor: `${p.color}40`,
              color: p.color,
            }}
          >
            <div className="w-8 h-8">{p.logo}</div>
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
            LIVE
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
          {p.name}
        </h3>
        <p
          className="text-[11px] font-mono tracking-[0.15em] uppercase mb-4"
          style={{ color: p.color }}
        >
          {p.tag}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="text-[10px] font-mono tracking-wider uppercase text-white/30 mb-1">
            Primary Models
          </div>
          <div className="text-sm text-white/70 font-medium">{p.model}</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Main section
────────────────────────────────────────────── */
export const PlatformStack: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #020304 0%, #05070a 40%, #05070a 60%, #020304 100%)',
      }}
      data-testid="platform-stack-section"
    >
      {/* Parallax grid */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '6rem 6rem',
          }}
        />
      </motion.div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(ellipse, rgba(216,255,61,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-px bg-[#d8ff3d]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d8ff3d]">
                /the orchestration stack
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                fontWeight: 500,
              }}
            >
              Ten frontier platforms.
              <br />
              <span
                className="italic text-white/60"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                one private control plane.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 text-white/55 text-lg leading-relaxed font-light"
          >
            We don't marry you to a vendor. We route each request to the best
            model for the job — with fallbacks, cost-caps, and observability
            baked into every call. Bring your own keys, or let us run a private
            endpoint on GPU capacity we manage.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {platforms.map((p, i) => (
            <PlatformCard key={p.name} p={p} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative rounded-3xl border border-white/10 overflow-hidden"
          style={{ background: '#080a0d' }}
          data-testid="router-banner"
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 85% 50%, rgba(216,255,61,0.16), transparent 60%)',
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 p-10 lg:p-14 items-center">
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d8ff3d] mb-4 block">
                /Router · built in
              </span>
              <h3
                className="text-white text-3xl lg:text-4xl leading-tight tracking-tight mb-4"
                style={{ fontWeight: 500 }}
              >
                One API call.{' '}
                <span
                  className="italic text-[#d8ff3d]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  every model.
                </span>
              </h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-lg">
                Our orchestration router picks Claude for long-form reasoning,
                GPT-5.2 for tool use, Gemini for multimodal, and Llama 4 for
                cost-sensitive inference — automatically, per request.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Semantic routing',
                  'Cost caps',
                  'PII redaction',
                  'Eval loops',
                  'Trace spans',
                ].map((f) => (
                  <span
                    key={f}
                    className="text-[11px] font-mono tracking-wide text-white/60 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.02]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Mock routing visual */}
            <div
              className="relative rounded-2xl border border-white/10 p-5 font-mono text-[12px] bg-black/50"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-white/30 text-[10px] tracking-wide">
                  opsyde-router · live
                </span>
              </div>
              <div className="space-y-1.5 leading-relaxed">
                <div>
                  <span className="text-white/30">POST</span>{' '}
                  <span className="text-[#d8ff3d]">/v1/chat</span>
                </div>
                <div className="text-white/40">
                  intent: <span className="text-white/80">"long_context_rag"</span>
                </div>
                <div className="text-white/40">
                  budget_cents: <span className="text-white/80">12</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      → routed to{' '}
                      <span style={{ color: '#CC785C' }}>claude-sonnet-4.5</span>
                    </span>
                    <span className="text-[#d8ff3d]">98ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      → fallback{' '}
                      <span style={{ color: '#0866FF' }}>llama-4-70b</span>
                    </span>
                    <span className="text-white/30">ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      → eval{' '}
                      <span style={{ color: '#10A37F' }}>gpt-5.2-judge</span>
                    </span>
                    <span className="text-white/30">async</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
