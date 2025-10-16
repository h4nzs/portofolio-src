Analyze and modify the CSS for the "Education" section (slide with id: 4). The text listing "Focus Areas" inside the .timeline-content cards is being truncated and is not fully visible.

Problem: The issue is caused by the parent container, .timeline-entry, which has a fixed calculated width that is too narrow to contain the long, single line of text, preventing it from wrapping as needed.

Instructions:

    Target the <p> tags specifically within the .timeline-content class.

    Apply CSS rules to these paragraphs to force the text to wrap when it exceeds the container's width. Use properties like white-space: normal; and word-wrap: break-word; to ensure the content wraps properly onto new lines.

    Ensure the card's height can adjust automatically to fit the newly wrapped content. Check if any fixed height property on .timeline-content or .timeline-entry is preventing this and adjust if necessary.

Constraint: Only modify the CSS related to the text wrapping inside the Education timeline cards. Do not change the overall timeline layout structure (the width: calc(50% - 60px) rule for .timeline-entry). The goal is to make the text wrap within the existing card dimensions.