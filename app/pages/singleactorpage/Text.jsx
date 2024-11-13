const Text = ({ data }) => {
  const actorInfo = data.actorBio;
  const formattedInfo = actorInfo.replace(/\\n\\n/g, "\n\n");
  const bioParagraphs = formattedInfo.split("\n\n");

  return (
    <div className="w-[50%] p-5">
      {bioParagraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Text;
