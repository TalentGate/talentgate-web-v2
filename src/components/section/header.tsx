interface HeaderProps {
  header: string;
  description: string;
}
const Header = ({ header, description }: HeaderProps) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold">{header}</h2>

      <p className="text-muted-foreground text-sm">{description}</p>
    </section>
  );
};

export default Header;
