export function formatAIResponse(rawText) {
  const segments = rawText
    .split('&&')
    .map((block) => block.trim())
    .filter(Boolean);

  const jsxElements = [];
  let displayIndex = 1;

  segments.forEach((segment) => {
    const match = segment.match(/\*{2,3}(.*?)\*{2,3}/s);

    if (match) {
      const title = match[1].trim();
      const rest = segment.replace(match[0], '').trim();

      jsxElements.push(
        <h2 key={`h2-${displayIndex}`} data-index={displayIndex++}>
          {title}
        </h2>
      );

      if (rest) {
        jsxElements.push(
          <p key={`p-${displayIndex}`} data-index={displayIndex++}>
            {rest}
          </p>
        );
      }
    } else {
      jsxElements.push(
        <p key={`p-${displayIndex}`} data-index={displayIndex++}>
          {segment}
        </p>
      );
    }
  });

  return jsxElements;
}
