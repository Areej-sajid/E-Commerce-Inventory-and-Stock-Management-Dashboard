
function CardWrapper({ title, children }) {
  return (
    <section className="panel">
      <h2 className="panel-title">{title}</h2>
      {children}
    </section>
  );
}

export default CardWrapper;
