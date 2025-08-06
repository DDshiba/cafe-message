import { motion } from "framer-motion";
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

const AnimatedText = ({ text, delay = 0.05 }) => {
  const letters = splitter.splitGraphemes(text);

  return (
    <div className="whitespace-pre-wrap text-center leading-relaxed tracking-normal font-[Prompt]">
      {letters.map((char, index) =>
        char === "\n" ? (
          <br key={index} />
        ) : (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * delay,
              duration: 0.25,
              type: "spring",
              stiffness: 150,
              damping: 18,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        )
      )}
    </div>
  );
};

export default AnimatedText;
