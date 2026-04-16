import './RichTextButtons.css';

function RichTextButtons({textareaRef, setBody}) {
  
    const applyFormatting = (type) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    setBody((prev) => {
      const selected = prev.substring(start, end);

      let formatted = selected;

      if (type === "bold") formatted = `**${selected}**`;
      if (type === "italic") formatted = `*${selected}*`;
      
      return prev.substring(0, start) + formatted + prev.substring(end);
    });

    // optional: restore focus after React updates
    setTimeout(() => {
      textarea.focus();
    }, 0);
  };  

  return (
    <div className="rich-text-buttons">
      <button type="button" id="boldBtn" onClick={() => applyFormatting("bold")}>B</button>
      <button type="button" id="italicBtn" onClick={() => applyFormatting("italic")}>I</button>      
    </div>
  );
}

export default RichTextButtons;