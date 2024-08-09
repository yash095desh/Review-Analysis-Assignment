import React, { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

const ReviewHighlighter = ({ review }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: { x: 0, y: 0 },
  });

  const [content, setcontent] = useState();

  let keywords = [];

  useEffect(() => {
    // creating keyword list
    review?.analytics?.map((analitic) => {
      analitic.sentences.map((sentance) => {
        const keyword = sentance.split("|||");
        keywords = [...keywords, ...keyword];
      });
    });
    // setting content
    const data = setContent();
    setcontent(data);
  }, []);

  // Hover Handlers
  const handleMouseEnter = (event, topic) => {
    const position = {
      x: event.clientX + 10,
      y: event.clientY + 10,
    };
    setTooltip({ visible: true, text: topic, position });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: "", position: { x: 0, y: 0 } });
  };



  // Filtering Content
  const translatedTexts = (text) => {
    const sections = text.split("(Translated):");
    const translatedText = sections
      .slice(1) // Ignore the first part, which comes before the first "(Translated):"
      .map((section) => {
        // Further split each section by "(Original):" to isolate the translated text
        const [translatedPart] = section.split("(Original):");
        return translatedPart.trim();
      })
      .join(" ");
    return translatedText;
  };

  // Changing color of content
  const getContentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-[#D9F2DD]";
      case "Negative":
        return "bg-[#F2DBD9]";
      case "Neutral":
        return "bg-[#eaf09b6b]";
      default:
        return "text-black";
    }
  };

  const setContent = () => {
    let content =
      review?.source_language !== "en"
        ? translatedTexts(review.content)
        : review.content;

    const regex = new RegExp(`(${keywords.join("|")})`, "gi");
    let parts = keywords.length > 0 ? content.split(regex) : [content];
    content = parts.map((part, index) => {
      if (keywords.includes(part)) {
        return (
          <span key={index} className={`${getContentColor(review?.sentiment)}`}>
            {part}
          </span>
        );
      }
      return part;
    });
    return content;
  };


  return (
    <div className=" flex flex-col gap-2 p-4 rounded-md border border-gray bg-white text-slate-800 w-full ">
      <div className=" flex gap-2 flex-wrap ">
        {review?.source && (
          <img
            src={"./booking3.png"}
            alt={review?.source?.name}
            className=" h-6 w-6 rounded-full"
          />
        )}
        <h2 className=" text-xs text-gray-400">
          <span className=" text-sm font-semibold text-slate-800">
            {review?.reviewer_name}
          </span>{" "}
          wrote a review at{" "}
          <span className=" text-sm font-semibold text-slate-800">
            {review?.source?.name}
          </span>
        </h2>
      </div>
      <div
        onMouseEnter={(ev) => handleMouseEnter(ev, review?.topic)}
        onMouseLeave={(ev) => handleMouseLeave()}
        className="font-medium text-slate-800"
      >
        {content}
      </div>

      {tooltip.visible && (
        <Tooltip text={tooltip.text} position={tooltip.position} />
      )}
    </div>
  );
};

export default ReviewHighlighter;
